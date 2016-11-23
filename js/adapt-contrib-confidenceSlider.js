define([
    'components/adapt-contrib-slider/js/adapt-contrib-slider',
    'core/js/adapt'
], function(Slider, Adapt) {

    var ConfidenceSlider = Slider.extend({

        /* override */
        preRender:function() {
            this.model.set('_isEnabled', true);
            Slider.prototype.preRender.apply(this, arguments);
        },

        /* override */
        setupDefaultSettings: function() {
            Slider.prototype.setupDefaultSettings.apply(this, arguments);
            this.model.set('_canShowModelAnswer', false);
            if (!this.model.has('_attempts') || this.model.get('_attempts') > 1) this.model.set('_attempts', 1);
        },

        /* override */
        setupQuestion: function() {
            if (this.model.get('_linkedToId')) {
                this._setupLinkedModel();
                this.listenTo(Adapt, "buttonsView:postRender", this.onButtonsRendered);
            }
            Slider.prototype.setupQuestion.apply(this, arguments);
        },

        /* override */
        disableQuestion: function() {
            if (this.model.get('_isReady')) this.setAllItemsEnabled(false);
            if (this.model.has('_linkedModel')) this.$('.buttons-action').a11y_cntrl_enabled(false);
        },

        /* override */
        enableQuestion: function() {
            if (this.model.get('_isReady')) this.setAllItemsEnabled(true);
            if (this.model.has('_linkedModel')) this.$('.buttons-action').a11y_cntrl_enabled(true);
        },

        /* override to indicate that all options are correct */
        setupModelItems: function() {
            var items = [];
            var start = this.model.get('_scaleStart');
            var end = this.model.get('_scaleEnd');
            var step = this.model.get('_scaleStep') || 1;

            for (var i = start; i <= end; i += step) {
                items.push({value: i, selected: false, correct: true});
            }

            this.model.set('_items', items);
            this.model.set('_marginDir', (Adapt.config.get('_defaultDirection') === 'rtl' ? 'right' : 'left'));
        },

        /* override */
        restoreUserAnswers: function() {
            if (!this.model.get('_isSubmitted')) {
                this.model.set({
                    _selectedItem: {},
                    _userAnswer: undefined
                });
                return;
            }

            // this is only necessary to avoid an issue when using adapt-devtools
            if (!this.model.has('_userAnswer')) this.model.set('_userAnswer', this.model.get('_items')[0].value);

            Slider.prototype.restoreUserAnswers.apply(this, arguments);
        },

        /* override */
        canSubmit: function() {
            return !this.model.has('_linkedModel') || this.model.get('_linkedModel').get('_isSubmitted');
        },

        /* override */
        setupFeedback: function(){
            this.model.set('feedbackTitle', this.model.get('title'));
            this.model.set('feedbackMessage', this._getFeedbackString());
        },

        /* override */
        updateButtons: function() {
            if (this.model.get('_attempts') > 0) {
                Slider.prototype.updateButtons.apply(this, arguments);
            }
            else {
                this.model.set('_buttonState', this.model.get('_isEnabled') ? 'submit' : 'reset');
            }

        },

        _setupLinkedModel: function() {
            var linkedModel = Adapt.components.findWhere({_id: this.model.get('_linkedToId')});
            this.model.set({
                '_showNumber':linkedModel.get('_showNumber'),
                '_showScaleIndicator':linkedModel.get('_showScaleIndicator'),
                '_showScale':linkedModel.get('_showScale'),
                'labelStart':linkedModel.get('labelStart'),
                'labelEnd':linkedModel.get('labelEnd'),
                '_scaleStart':linkedModel.get('_scaleStart'),
                '_scaleEnd':linkedModel.get('_scaleEnd')
            });
            this.model.set('_linkedModel', linkedModel);
            if (this.model.get('_attempts') < 0) linkedModel.set('_attempts', 1);
        },

        _listenToLinkedModel: function() {
            this.listenTo(this.model.get('_linkedModel'), 'change:_selectedItem', this.onLinkedConfidenceChanged);
            this.listenTo(this.model.get('_linkedModel'), 'change:_isSubmitted', this.onLinkedSubmittedChanged);
        },

        _updateLinkedConfidenceIndicator: function() {
            var lm = this.model.get('_linkedModel');
            var linkedValue = 0;
            var rangeslider = this.$slider.data('plugin_rangeslider');

            //if (lm.get('_isSubmitted')) {
                linkedValue = lm.has('_userAnswer') ? lm.get('_userAnswer') : lm.get('_selectedItem').value;
            //}

            if (linkedValue == this.model.get('_scaleEnd')) {
                this.$('.linked-confidence-bar').css({width: '100%'});
            }
            else {
                // follow rangeslider setPosition method
                this.$('.linked-confidence-bar').css({width: (rangeslider.getPositionFromValue(linkedValue) + rangeslider.grabPos) + 'px'});
            }
        },

        _getFeedbackString: function() {
            var feedbackSeparator = this.model.get('_feedback').feedbackSeparator,
                genericFeedback = this._getGenericFeedback(),
                comparisonFeedback = this.model.has('_linkedModel') && this.model.get('_linkedModel').get('_isSubmitted') ? this._getComparisonFeedback() : null,
                thresholdFeedback = this._getThresholdFeedback(),
                needsSeparator = false,
                feedbackString = "";

            if (genericFeedback) {
                feedbackString += genericFeedback;
                needsSeparator = true;
            }
            if (comparisonFeedback) {
                if(needsSeparator) feedbackString += feedbackSeparator;
                feedbackString += comparisonFeedback;
                needsSeparator = true;
            }
            if (thresholdFeedback) {
                if(needsSeparator) feedbackString += feedbackSeparator;
                feedbackString += thresholdFeedback;
            }

            return feedbackString;

        },

        _getGenericFeedback: function() {
            return this.model.get('_feedback').generic;
        },

        _getComparisonFeedback: function() {
            var lm = this.model.get('_linkedModel'),
                confidence = this.model.get('_selectedItem').value,
                linkedConfidence = lm.has('_userAnswer') ? lm.get('_userAnswer') : lm.get('_selectedItem').value,
                feedbackString;
            if (linkedConfidence < confidence) {
                feedbackString = this.model.get('_feedback')._comparison.higher;
            } else if (linkedConfidence > confidence) {
                feedbackString = this.model.get('_feedback')._comparison.lower;
            } else {
                feedbackString = this.model.get('_feedback')._comparison.same;
            }
            return feedbackString;
        },

        _getThresholdFeedback: function() {
            var feedbackList = this.model.get('_feedback')._threshold;

            if (!feedbackList) return;

            var confidenceValue = this.model.get('_selectedItem').value;

            for (var i = 0, j = feedbackList.length; i < j; i++) {
                var feedback = feedbackList[i];
                var values = feedback._values;

                if (confidenceValue >= values._low && confidenceValue <= values._high) {
                    return feedback.text;
                }
            }
        },

        _getTrackingData:function() {
            if (this.model.get('_isInteractionComplete') === false || this.model.get('_isComplete') === false) {
                return null;
            }

            var hasUserAnswer = (this.model.get('_userAnswer') !== undefined);
            var isUserAnswerArray = (this.model.get('_userAnswer') instanceof Array);

            var numericParameters = [
                    this.model.get('_score') || 0,
                    this.model.get('_attemptsLeft') || 0
                ];

            var booleanParameters = [
                    hasUserAnswer ? 1 : 0,
                    isUserAnswerArray ? 1 : 0,
                    this.model.get('_isInteractionComplete') ? 1 : 0,
                    this.model.get('_isSubmitted') ? 1 : 0,
                    this.model.get('_isCorrect') ? 1 : 0
                ];

            var data = [
                numericParameters,
                booleanParameters
            ];


            if (hasUserAnswer) {
                var userAnswer = isUserAnswerArray ? this.model.get('_userAnswer') : [this.model.get('_userAnswer')];

                data.push(userAnswer);
            }

            return data;
        },

        _updateTracking:function() {
            // should we track this component?
            if (this.model.get('_shouldStoreResponses')) {
                // is tracking is enabled?
                if (Adapt.config.has('_spoor') && Adapt.config.get('_spoor')._isEnabled) {
                    // if spoor is handling response tracking we don't need to do anything
                    if (!Adapt.config.get('_spoor')._tracking._shouldStoreResponses) {
                        // otherwise write custom tracking data
                        Adapt.offlineStorage.set(this.model.get('_id'), this._getTrackingData());
                    }
                }
            }
        },

        onQuestionRendered: function() {
            Slider.prototype.onQuestionRendered.apply(this, arguments);

            if (this.model.has('_linkedModel')) {
                this.$('.rangeslider').prepend($('<div class="linked-confidence-bar"/>'));
                this._listenToLinkedModel();
                if (this.model.get('_linkedModel').get('_isSubmitted')) {
                    this.onLinkedConfidenceChanged();
                } else {
                    this.model.set('_isEnabled', false);
                    this.$('.component-body-inner').html(this.model.get('disabledBody'));
                }
            }

            if (this.model.get('_isSubmitted') && this.model.has('_userAnswer')) {
                this.model.set('feedbackTitle', this.model.get('title'));
                this.model.set('feedbackMessage', this._getFeedbackString());
            }
        },

        onScreenSizeChanged: function() {
            Slider.prototype.onScreenSizeChanged.apply(this, arguments);

            // if linked slider on same page update it with user interaction
            if (this.model.has('_linkedModel') && this.model.get('_linkedModel').get('_isReady')) {
                this._updateLinkedConfidenceIndicator();
            }
        },

        onResetClicked: function() {
            Slider.prototype.onResetClicked.apply(this, arguments);

            this.model.reset('hard', true);

            this._updateTracking();
        },

        onSubmitClicked: function() {
            Slider.prototype.onSubmitClicked.apply(this, arguments);

            this._updateTracking();
        },

        onButtonsRendered:function(buttonsView) {
            // necessary due to deferred ButtonsView::postRender
            if (this.buttonsView == buttonsView) {
                if (!this.model.get('_isEnabled')) {
                    if (!this.model.has('_linkedModel') || !this.model.get('_linkedModel').get('_isSubmitted')) {
                        this.$('.buttons-action').a11y_cntrl_enabled(false);
                    }
                }
            }
        },

        onLinkedConfidenceChanged: function() {
            this._updateLinkedConfidenceIndicator();
        },

        onLinkedSubmittedChanged: function(linkedModel) {
            if (linkedModel.get('_isSubmitted')) {
                this.model.set('_isEnabled', true);
            }
            else {
                this.model.set('_isEnabled', false);
            }
        }
    }, {
        template:'confidenceSlider'
    });
    
    Adapt.register("confidenceSlider", ConfidenceSlider);

    Adapt.on('app:dataReady', function() {
        // is tracking enabled?
        if (Adapt.config.has('_spoor') && Adapt.config.get('_spoor')._isEnabled) {
            // if spoor is handling response tracking we don't need to do anything
            if (!Adapt.config.get('_spoor')._tracking._shouldStoreResponses) {
                // ensure data is setup
                Adapt.offlineStorage.get();

                _.each(Adapt.components.where({'_component':'confidenceSlider', '_shouldStoreResponses':true}), function(confidenceSlider) {
                    var dataItem = Adapt.offlineStorage.get(confidenceSlider.get('_id'));

                    if (!dataItem) return;

                    var numericParameters = dataItem[0];
                    var booleanParameters = dataItem[1];

                    var score = numericParameters[0];
                    var attemptsLeft = numericParameters[1] || 0;

                    var hasUserAnswer = booleanParameters[0];
                    var isUserAnswerArray = booleanParameters[1];
                    var isInteractionComplete = booleanParameters[2];
                    var isSubmitted = booleanParameters[3];
                    var isCorrect = booleanParameters[4];

                    confidenceSlider.set("_isComplete", true);
                    confidenceSlider.set("_isInteractionComplete", isInteractionComplete);
                    confidenceSlider.set("_isSubmitted", isSubmitted);
                    confidenceSlider.set("_score", score);
                    confidenceSlider.set("_isCorrect", isCorrect);
                    confidenceSlider.set("_attemptsLeft", attemptsLeft);

                    if (hasUserAnswer) {
                        var userAnswer = dataItem[2];
                        if (!isUserAnswerArray) userAnswer = userAnswer[0];

                        confidenceSlider.set("_userAnswer", userAnswer);
                    }
                });
            }
        }
    });
    
    return ConfidenceSlider;
});
