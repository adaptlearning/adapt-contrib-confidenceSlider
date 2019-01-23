define([
    'core/js/adapt',
    'components/adapt-contrib-slider/js/sliderModel',
], function(Adapt, SliderModel) {

    var ConfidenceSliderModel = SliderModel.extend({

        init: function() {
            SliderModel.prototype.init.call(this);

            if (this.get('_linkedToId')) {
                this._setupLinkedModel();
            }
        },

        /* override */
        setupDefaultSettings: function() {
            SliderModel.prototype.setupDefaultSettings.apply(this, arguments);
            this.set('_canShowModelAnswer', false);
            if (!this.has('_attempts') || this.get('_attempts') > 1) this.set('_attempts', 1);
        },

        /* override to indicate that all options are correct */
        setupModelItems: function() {
            var items = [];
            var start = this.get('_scaleStart');
            var end = this.get('_scaleEnd');
            var step = this.get('_scaleStep') || 1;

            for (var i = start; i <= end; i += step) {
                items.push({value: i, selected: false, correct: true});
            }

            this.set({
                _items: items,
                _marginDir: (Adapt.config.get('_defaultDirection') === 'rtl' ? 'right' : 'left')
            });
        },

        /* override */
        restoreUserAnswers: function() {
            if (!this.get('_isSubmitted')) {
                this.set({
                    _selectedItem: {},
                    _userAnswer: undefined
                });
                return;
            }

            // this is only necessary to avoid an issue when using adapt-devtools
            if (!this.has('_userAnswer')) this.set('_userAnswer', this.get('_items')[0].value);

            SliderModel.prototype.restoreUserAnswers.apply(this, arguments);
        },

        /* override */
        canSubmit: function() {
            return !this.has('_linkedModel') || this.get('_linkedModel').get('_isSubmitted');
        },

        /* override */
        setupFeedback: function(){
            this.set( {
                feedbackTitle: this.get('title'),
                feedbackMessage: this.getFeedbackString()
            });
        },

        /* override */
        updateButtons: function() {
            if (this.get('_attempts') > 0) {
                SliderModel.prototype.updateButtons.apply(this, arguments);
            }
            else {
                this.set('_buttonState', this.get('_isEnabled') ? 'submit' : 'reset');
            }

        },

        updateTracking:function() {
            // should we track this component?
            if (this.get('_shouldStoreResponses')) {
                // is tracking is enabled?
                if (Adapt.config.has('_spoor') && Adapt.config.get('_spoor')._isEnabled) {
                    // if spoor is handling response tracking we don't need to do anything
                    if (!Adapt.config.get('_spoor')._tracking._shouldStoreResponses) {
                        // otherwise write custom tracking data
                        Adapt.offlineStorage.set(this.get('_id'), this._getTrackingData());
                    }
                }
            }
        },

        getFeedbackString: function() {
            var feedbackSeparator = this.get('_feedback').feedbackSeparator,
                genericFeedback = this._getGenericFeedback(),
                comparisonFeedback = this.has('_linkedModel') && this.get('_linkedModel').get('_isSubmitted') ? this._getComparisonFeedback() : null,
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

        _setupLinkedModel: function() {
            var linkedModel = Adapt.components.findWhere({_id: this.get('_linkedToId')});

            if (!linkedModel) {
                Adapt.log.error("Please check that you have set _linkedToId correctly!");
                return;
            }

            if (linkedModel.get('_component') !== "confidenceSlider") {
                Adapt.log.warn("The component you have linked confidenceSlider " + this.get('_id') + " to is not a confidenceSlider component!");
                return;
            }

            this.set({
                _showNumber: linkedModel.get('_showNumber'),
                _showScaleIndicator: linkedModel.get('_showScaleIndicator'),
                _showScale: linkedModel.get('_showScale'),
                labelStart: linkedModel.get('labelStart'),
                labelEnd: linkedModel.get('labelEnd'),
                _scaleStart: linkedModel.get('_scaleStart'),
                _scaleEnd: linkedModel.get('_scaleEnd')
            });

            this.set('_linkedModel', linkedModel);

            if (this.get('_attempts') < 0) linkedModel.set('_attempts', 1);
        },

        _getGenericFeedback: function() {
            return this.get('_feedback').generic;
        },

        _getComparisonFeedback: function() {
            var lm = this.get('_linkedModel'),
                confidence = this.get('_selectedItem').value,
                linkedConfidence = lm.has('_userAnswer') ? lm.get('_userAnswer') : lm.get('_selectedItem').value,
                feedbackString;
            if (linkedConfidence < confidence) {
                feedbackString = this.get('_feedback')._comparison.higher;
            } else if (linkedConfidence > confidence) {
                feedbackString = this.get('_feedback')._comparison.lower;
            } else {
                feedbackString = this.get('_feedback')._comparison.same;
            }
            return feedbackString;
        },

        _getThresholdFeedback: function() {
            var feedbackList = this.get('_feedback')._threshold;

            if (!feedbackList) return;

            var confidenceValue = this.get('_selectedItem').value;

            for (var i = 0, j = feedbackList.length; i < j; i++) {
                var feedback = feedbackList[i];
                var values = feedback._values;

                if (confidenceValue >= values._low && confidenceValue <= values._high) {
                    return feedback.text;
                }
            }
        },

        _getTrackingData:function() {
            if (this.get('_isInteractionComplete') === false || this.get('_isComplete') === false) {
                return null;
            }

            var hasUserAnswer = (this.get('_userAnswer') !== undefined);
            var isUserAnswerArray = (this.get('_userAnswer') instanceof Array);

            var numericParameters = [
                    this.get('_score') || 0,
                    this.get('_attemptsLeft') || 0
                ];

            var booleanParameters = [
                    hasUserAnswer ? 1 : 0,
                    isUserAnswerArray ? 1 : 0,
                    this.get('_isInteractionComplete') ? 1 : 0,
                    this.get('_isSubmitted') ? 1 : 0,
                    this.get('_isCorrect') ? 1 : 0
                ];

            var data = [
                numericParameters,
                booleanParameters
            ];


            if (hasUserAnswer) {
                var userAnswer = isUserAnswerArray ? this.get('_userAnswer') : [this.get('_userAnswer')];

                data.push(userAnswer);
            }

            return data;
        }
    });

    return ConfidenceSliderModel;
});
