define(function(require) {
    var Slider = require('components/adapt-contrib-slider/js/adapt-contrib-slider');
    var Adapt = require('coreJS/adapt');
    var AdaptStatefulSession = require('extensions/adapt-contrib-spoor/js/adapt-stateful-session');

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
            this.setAllItemsEnabled(false);
            if (this.model.has('_linkedModel')) this.$('.buttons-action').a11y_cntrl_enabled(false);
        },

        /* override */
        enableQuestion: function() {
            this.setAllItemsEnabled(true);
            if (this.model.has('_linkedModel')) this.$('.buttons-action').a11y_cntrl_enabled(true);
        },

        /* override to indicate that all options are correct */
        setupModelItems: function() {
            var items = [];
            var start = this.model.get('_scaleStart');
            var end = this.model.get('_scaleEnd');

            for (var i = start; i <= end; i++) {
                items.push({value: i, selected: false, correct: true});
            }

            this.model.set('_items', items);
        },

        /* override */
        restoreUserAnswers: function() {
            if (!this.model.get('_isSubmitted')) return;

            // this is only necessary to avoid an issue when using adapt-cheat
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
                '_scaleEnd':linkedModel.get('_scaleEnd'),
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
            var linkedValue = lm.get('_isSubmitted') && lm.has('_userAnswer') ? lm.get('_userAnswer') : lm.get('_selectedItem').value;
            var rangeslider = this.$slider.data('plugin_rangeslider');

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
                comparisonFeedback = this.model.has('_linkedModel') ? this._getComparisonFeedback() : null,
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
                linkedConfidence = lm.get('_isSubmitted') && lm.has('_userAnswer') ? lm.get('_userAnswer') : lm.get('_selectedItem').value,
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
            if (!this.model.get('_feedback')._threshold) return;
            var confidenceValue = this.model.get('_selectedItem').value,
                appropriateFeedback = _.filter(this.model.get('_feedback')._threshold, function(feedbackItem) {
                    return confidenceValue >= feedbackItem._values._low && confidenceValue <= feedbackItem._values._high;
                }, this);

            return appropriateFeedback[0].text;
        },

        onQuestionRendered: function() {
            Slider.prototype.onQuestionRendered.apply(this, arguments);

            if (this.model.has('_linkedModel')) {
                this.$('.rangeslider').prepend($('<div class="linked-confidence-bar"/>'))
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

            AdaptStatefulSession.saveSessionState();
        },

        onSubmitClicked: function() {
            Slider.prototype.onSubmitClicked.apply(this, arguments);

            AdaptStatefulSession.saveSessionState();
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
    
    return ConfidenceSlider;
});