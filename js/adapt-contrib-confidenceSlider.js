/*
* adapt-contrib-confidenceSlider
* License - http://github.com/adaptlearning/adapt_framework/LICENSE
* Maintainers - Kev Adsett <kev.adsett@kineo.com>
*/

define(function(require) {
    var Slider = require('components/adapt-contrib-slider/js/adapt-contrib-slider');
    var QuestionView = require('coreViews/questionView');
    var Adapt = require('coreJS/adapt');

    var ConfidenceSlider = Slider.extend({
        events: {
            'click .confidenceSlider-item-outer-bar': 'onItemBarSelected',
            'click .confidenceSlider-item-bar-background': 'onItemBarSelected',
            'click .confidenceSlider-item-indicator-bar': 'onItemBarSelected',
            'click .confidenceSlider-item-linked-confidence-bar': 'onItemBarSelected',
            'click .confidenceSlider-item-handle': 'preventEvent',
            'touchstart .confidenceSlider-item-handle':'onHandlePressed',
            'mousedown .confidenceSlider-item-handle': 'onHandlePressed',
            'focus .confidenceSlider-item-handle':'onHandleFocus',
            'click .confidenceSlider-widget .button.submit': 'onSubmitClicked',
        },
        
        animateToPosition: function(newPosition) {
            console.log("Animate to : " + newPosition);
            this.$('.confidenceSlider-item-handle').stop(true).animate({
                left: newPosition + 'px'
            }, 300, _.bind(function(){
                this.setNormalisedHandlePosition();
            }, this));
            this.$('.confidenceSlider-item-indicator-bar').stop(true).animate({
                width:newPosition + 'px'
            }, 300);
        },

        canSubmit: function() {
            if (this.model.get('_hasHadInteraction')) {
                return true;
            } else {
                return false;
            }
        },

        getIndexFromValue: function(itemValue) {
            var scale = this.model.get('_scale');
            return Math.floor(this.mapValue(itemValue, scale._low, scale._high, 0, this.model.get('items').length - 1));
        },

        preRender: function() {
            var firstPart;
            if(!this.model.get('_isFirstPart')) {
                this.setupLinkedModel();
                firstPart = this.model.get('_firstPart');
            }
            Slider.prototype.preRender.apply(this);
            if(firstPart) {
                this.model.set('_isEnabled', firstPart.get('_isComplete'));
            }
        },

        setupLinkedModel: function() {
            var linkedModel = Adapt.components.findWhere({_id: this.model.get('_firstPartId')});
            this.model.set('_scale', _.clone(linkedModel.get('_scale')));
            this.model.set('axisLabel', linkedModel.get('axisLabel'));
            this.model.set('_firstPart', linkedModel);
        },

        postRender: function() {
            this.setScalePositions();
            this.showAppropriateNumbers();
            if(!this.model.get('_isFirstPart')) {
                this.listenToLinkedModel();
                if(!this.model.get('_firstPart').get('_isComplete')) {
                    this.$('.confidenceSlider-body').html(this.model.get('disabledBody'));
                }
            }
            this.setNormalisedHandlePosition();
            Slider.prototype.postRender.apply(this);
        },

        listenToLinkedModel: function() {
            this.listenTo(this.model.get('_firstPart'), 'change:_confidence', this.onLinkedConfidenceChanged);
            this.listenTo(this.model.get('_firstPart'), 'change:_isSubmitted', this.onLinkedSubmittedChanged);
        },

        onLinkedConfidenceChanged: function(linkedModel) {
            this.model.set({
                _linkedConfidence: linkedModel.get('_confidence')
            });
            this.updateLinkedConfidenceIndicator();
        },

        onLinkedSubmittedChanged: function(linkedModel) {
            if(linkedModel.get('_isSubmitted')) {
                this.enableSelf();
            }
        },

        enableSelf: function() {
            this.model.set('_isEnabled', true);
            this.$('.confidenceSlider-widget').removeClass('disabled');
            this.$('.confidenceSlider-body').html(this.model.get('body'));
        },

        updateLinkedConfidenceIndicator: function() {
            this.$('.confidenceSlider-item-linked-confidence-bar').css({
                width: this.$('.confidenceSlider-item-bar').width() * this.model.get('_linkedConfidence')
            })
        },

        mapIndexToPixels: function(value) {
            var numberOfItems = this.model.get('items').length,
                width = this.$('.confidenceSlider-item-bar').width();
            
            return Math.round(this.mapValue(value, 0, numberOfItems - 1, 0, width));
        },
        
        mapPixelsToIndex: function(value) {
            var numberOfItems = this.model.get('items').length;
            return Math.round(this.normalisePixelPosition(value) * (numberOfItems - 1));
        },

        normalisePixelPosition: function(pixelPosition) {
            return this.normalise(pixelPosition, 0, this.$('.confidenceSlider-item-bar').width())
        },

        showAppropriateNumbers: function() {
            switch (this.model.get('_scale')._showNumberValues) {
                case "all":
                    this.$('.confidenceSlider-scale-number').removeClass('display-none');
                    this.$('.confidenceSlider-scale-notch').removeClass('display-none');
                    break;
                case "lowHigh":
                case "highLow":
                    this.$('.confidenceSlider-scale-number').first().removeClass('display-none');
                    this.$('.confidenceSlider-scale-notch').first().removeClass('display-none');
                    this.$('.confidenceSlider-scale-number').last().removeClass('display-none');
                    this.$('.confidenceSlider-scale-notch').last().removeClass('display-none');
                    break;
                default: 
                    this.$('.confidenceSlider-scale-notch').first().removeClass('display-none');
                    this.$('.confidenceSlider-scale-notch').last().removeClass('display-none');
                    break;
            }
        },

        setScalePositions: function() {
            var numberOfItems = this.model.get('items').length;
            _.each(this.model.get('items'), function(item, index) {
                var normalisedPosition = this.normalise(index, 0, numberOfItems -1);
                this.$('.confidenceSlider-scale-number').eq(index).data('normalisedPosition', normalisedPosition);
                this.$('.confidenceSlider-scale-notch').eq(index).data('normalisedPosition', normalisedPosition);
            }, this);
        },

        onDragReleased: function (event) {
            event.preventDefault();
            $(document).off('mousemove touchmove');
            this.setNormalisedHandlePosition();
            if(this.model.get('_scale')._snapToNumbers) {
                var itemIndex = this.getIndexFromValue(this.getSelectedItems().value);
                this.selectItem(itemIndex);
                this.animateToPosition(this.mapIndexToPixels(itemIndex));
            }
        },

        onHandleDragged: function (event) {
            event.preventDefault();
            var left = (event.pageX || event.originalEvent.touches[0].pageX) - event.data.offsetLeft;
            left = Math.max(Math.min(left, event.data.width), 0);
            
            this.$('.confidenceSlider-item-handle').css({
                left: left + 'px'
            });

            this.$('.confidenceSlider-item-indicator-bar').css({
                width: left + 'px'
            });

            this.selectItem(this.mapPixelsToIndex(left));
        },
        
        onHandleFocus: function(event) {
            event.preventDefault();
            this.$('.confidenceSlider-item-handle').on('keydown', _.bind(this.onKeyDown, this));
        },
        
        onHandlePressed: function (event) {
            event.preventDefault();
            if (!this.model.get("_isEnabled") || this.model.get("_isSubmitted")) return;
            
            var eventData = {
                width:this.$('.confidenceSlider-item-bar').width(),
                offsetLeft: this.$('.confidenceSlider-item-bar').offset().left
            };
            $(document).on('mousemove touchmove', eventData, _.bind(this.onHandleDragged, this));
            $(document).one('mouseup touchend', eventData, _.bind(this.onDragReleased, this));
            this.model.set('_hasHadInteraction', true);
        },
        
        onItemBarSelected: function (event) {
            event.preventDefault();
            if (!this.model.get("_isEnabled") || this.model.get("_isSubmitted")) return;
                                
            var offsetLeft = this.$('.confidenceSlider-item-bar').offset().left,
                width = this.$('.confidenceSlider-item-bar').width(),
                left = (event.pageX || event.originalEvent.touches[0].pageX) - offsetLeft;
            
            left = Math.max(Math.min(left, width), 0);
            var nearestItemIndex = this.mapPixelsToIndex(left);
            this.selectItem(left);
            var pixelPosition = this.model.get('_scale')._snapToNumbers ? this.mapIndexToPixels(nearestItemIndex) : left;
            this.animateToPosition(pixelPosition);
            this.model.set('_hasHadInteraction', true);
        },

        preventEvent: function(event) {
            event.preventDefault();
        },

        onScreenSizeChanged: function() {
            var scaleWidth = this.$('.confidenceSlider-scale-notches').width(),
                $notches = this.$('.confidenceSlider-scale-notch'),
                $numbers = this.$('.confidenceSlider-scale-number');
            for(var i = 0, count = this.model.get('items').length; i < count; i++) {
                var $notch = $notches.eq(i), $number = $numbers.eq(i),
                    newLeft = Math.round($notch.data('normalisedPosition') * scaleWidth);
                $notch.css({left: newLeft});
                $number.css({left: newLeft});
            }
            var $handle = this.$('.confidenceSlider-item-handle'),
                handlePosition = Math.round($handle.data('normalisedPosition') * scaleWidth);
            $handle.css({
                left: handlePosition
            });
            this.$('.confidenceSlider-item-indicator-bar').css({
                width: handlePosition
            });
            if(!this.model.get('_isFirstPart') && this.model.get('_linkedConfidence') !== undefined) {
                this.updateLinkedConfidenceIndicator();
            }
        },
        
        selectItem: function(itemIndex) {
            _.each(this.model.get('items'), function(item, index) {
                item.selected = (index === itemIndex);
                if(item.selected) {
                    var selectedItems = this.model.get('_selectedItems');
                    selectedItems[0] = item;
                    this.model.set('_selectedItems', selectedItems);
                }
            }, this);
        },

        setNormalisedHandlePosition: function() {
            var $handle = this.$('.confidenceSlider-item-handle');
            var normalisedPosition = this.normalisePixelPosition(parseInt($handle.css('left').slice(0, -2)));
            // cater for string-based left values such as 'auto'
            if(_.isNaN(normalisedPosition)) normalisedPosition = 0;
            $handle.data('normalisedPosition', normalisedPosition);
            this.model.set('_confidence', normalisedPosition);
        },

        setupModelItems: function() {
            var items = [],
                scale = this.model.get('_scale');
            
            for(var i = scale._low; i <= scale._high; i++) {
                items.push({value: i, selected:false});
            }
            this.model.set('items', items);
        },

        markQuestion: function() {
            this.setCompletionStatus();
        },
        
        showFeedback: function() {
            this.model.set('_feedbackMessage', this.getFeedbackString());

            Adapt.mediator.defaultCallback('questionView:feedback', function(feedback) {
                Adapt.trigger('questionView:showFeedback', feedback);
            });

            Adapt.trigger('questionView:feedback', {
                title: this.model.get('title'),
                message:this.model.get('_feedbackMessage'),
                audio:this.model.get('feedbackAudio')
            });
        },

        setupFeedbackArrays: function() {
            // intentionally blank
        },

        getFeedbackString: function() {
            var feedbackSeparator = this.model.get('_feedback').feedbackSeparator,
                genericFeedback = this.getGenericFeedback(),
                comparisonFeedback = this.getComparisonFeedback(),
                thresholdFeedback = this.getThresholdFeedback(),
                needsSeparator = false,
                feedbackString = "";

            if(genericFeedback) {
                feedbackString += genericFeedback;
                needsSeparator = true;
            }
            if(comparisonFeedback) {
                if(needsSeparator) feedbackString += feedbackSeparator;
                feedbackString += comparisonFeedback;
                needsSeparator = true;
            }
            if(thresholdFeedback) {
                if(needsSeparator) feedbackString += feedbackSeparator;
                feedbackString += thresholdFeedback;
            }

            return feedbackString;

        },

        getGenericFeedback: function() {
            return this.model.get('_feedback').generic;
        },

        getThresholdFeedback: function() {
            var confidence = this.model.get('_confidence'),
                scale = this.model.get('_scale'),
                confidenceValue = Math.round(scale._low + (confidence * (scale._high - scale._low))),
                appropriateFeedback = _.filter(this.model.get('_feedback')._threshold, function(feedbackItem) {
                    return confidenceValue >= feedbackItem._values._low && confidenceValue <= feedbackItem._values._high;
                }, this);

            return appropriateFeedback[0].text;
        },

        getComparisonFeedback: function() {
            if(this.model.get('_isFirstPart')) return;
            var confidence = this.model.get('_confidence'),
                linkedConfidence = this.model.get('_firstPart').get('_confidence'),
                confidenceDifference = confidence - linkedConfidence,
                feedbackString;
            if (confidenceDifference < -0.01) {
                feedbackString = this.model.get('_feedback')._comparison.lower;
            } else if (confidenceDifference > 0.01) {
                feedbackString = this.model.get('_feedback')._comparison.higher;
            } else {
                feedbackString = this.model.get('_feedback')._comparison.same;
            }
            return feedbackString;
        },

        onUserAnswerShown: function() {
            if(this.model.get('_userAnswer').length > 0) {
                Slider.prototype.onUserAnswerShown.apply(this);
            }
        }
    });
    
    Adapt.register("confidenceSlider", ConfidenceSlider);
    
});