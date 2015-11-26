define(function(require) {
    var Slider = require('components/adapt-contrib-slider/js/adapt-contrib-slider');
    var QuestionView = require('coreViews/questionView');
    var Adapt = require('coreJS/adapt');

    var ConfidenceSlider = Slider.extend({
        events: {
            'click .confidenceSlider-item-outer-bar': 'onItemBarSelected',
            'click .confidenceSlider-item-bar-background': 'onItemBarSelected',
            'click .confidenceSlider-item-indicator-bar': 'onItemBarSelected',
            'click .confidenceSlider-item-handle': 'preventEvent',
            'touchstart .confidenceSlider-item-handle':'onHandlePressed',
            'mousedown .confidenceSlider-item-handle': 'onHandlePressed',
            'focus .confidenceSlider-item-handle':'onHandleFocus',
            'blur .confidenceSlider-item-handle':'onHandleBlur'
        },
        
        animateToPosition: function(newPosition) {
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
            return Math.floor(this.mapValue(itemValue, scale._low, scale._high, 0, this.model.get('_items').length - 1));
        },

        onQuestionRendered: function() {
            this.setScalePositions();
            this.showAppropriateNumbers();
            this.setNormalisedHandlePosition();
            this.setAltText(this.model.get('_scale')._low);
            Slider.prototype.onQuestionRendered.apply(this);
        },

        setAltText: function(value) {
            this.$('.confidenceSlider-item-handle').attr('alt', value);
        },

        resetQuestion: function(properties) {
            Slider.prototype.resetQuestion.apply(this, arguments);
            if(this.model.get('_isEnabled')) {
                this.model.set({
                    _confidence: 0
                });
                this.setAltText(this.model.get('_scale')._low);
            }
        },

        mapIndexToPixels: function(value) {
            var numberOfItems = this.model.get('_items').length,
                width = this.$('.confidenceSlider-item-bar').width();
            return Math.round(this.mapValue(value, 0, numberOfItems - 1, 0, width));
        },

        mapPixelsToIndex: function(value) {
            var numberOfItems = this.model.get('_items').length;
            return Math.round(this.normalisePixelPosition(value) * (numberOfItems - 1));
        },

        normalisePixelPosition: function(pixelPosition) {
            return this.normalise(pixelPosition, 0, this.$('.confidenceSlider-item-bar').width());
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
            var numberOfItems = this.model.get('_items').length;
            _.each(this.model.get('_items'), function(item, index) {
                var normalisedPosition = this.normalise(index, 0, numberOfItems -1);
                this.$('.confidenceSlider-scale-number').eq(index).data('normalisedPosition', normalisedPosition);
                this.$('.confidenceSlider-scale-notch').eq(index).data('normalisedPosition', normalisedPosition);
            }, this);
        },

        getSelectedItems: function(){
            return this.model.get('_selectedItem');
        },

        onDragReleased: function (event) {
            event.preventDefault();
            $(document).off('mousemove touchmove');
            this.setNormalisedHandlePosition();
            if(this.model.get('_scale')._snapToNumbers) {
                var itemIndex = this.getIndexFromValue(this.getSelectedItems()[0].value);
                this.selectItem(itemIndex);
                this.animateToPosition(this.mapIndexToPixels(itemIndex));
                this.setAltText(itemIndex + 1);
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

        onHandleBlur: function(event) {
            event.preventDefault();
            this.$('.confidenceSlider-item-handle').off('keydown');
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

        onKeyDown: function(event) {
            this.model.set('_hasHadInteraction', true);
            if(event.which == 9) return; // tab key
            event.preventDefault();

            var newItemIndex = this.getIndexFromValue(this.getSelectedItems()[0].value);

            switch (event.which) {
                case 40: // ↓ down
                case 37: // ← left
                    newItemIndex = Math.max(newItemIndex - 1, 0);
                    break;
                case 38: // ↑ up
                case 39: // → right
                    newItemIndex = Math.min(newItemIndex + 1, this.model.get('_scale')._high - 1);
                    break;
            }

            this.selectItem(newItemIndex);
            if(typeof newItemIndex == "number") this.showScaleMarker(true);
            this.animateToPosition(this.mapIndexToPixels(newItemIndex));
            this.setAltText(newItemIndex + 1);
        },
        
        onItemBarSelected: function (event) {
            event.preventDefault();
            if (!this.model.get("_isEnabled") || this.model.get("_isSubmitted")) return;
                                
            var offsetLeft = this.$('.confidenceSlider-item-bar').offset().left,
                width = this.$('.confidenceSlider-item-bar').width(),
                left = (event.pageX || event.originalEvent.touches[0].pageX) - offsetLeft;
            
            left = Math.max(Math.min(left, width), 0);
            var nearestItemIndex = this.mapPixelsToIndex(left);
            this.selectItem(this.mapPixelsToIndex(left));
            var pixelPosition = this.model.get('_scale')._snapToNumbers ? this.mapIndexToPixels(nearestItemIndex) : left;
            this.animateToPosition(pixelPosition);
            this.model.set('_hasHadInteraction', true);
            this.setAltText(nearestItemIndex + 1);
        },

        preventEvent: function(event) {
            event.preventDefault();
        },

        onScreenSizeChanged: function() {
            var scaleWidth = this.$('.confidenceSlider-scale-notches').width(),
                $notches = this.$('.confidenceSlider-scale-notch'),
                $numbers = this.$('.confidenceSlider-scale-number');
            for(var i = 0, count = this.model.get('_items').length; i < count; i++) {
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
        },
        
        selectItem: function(itemIndex) {
            _.each(this.model.get('_items'), function(item, index) {
                item.selected = (index === itemIndex);
                if(item.selected) {
                    var selectedItems = this.getSelectedItems();
                    selectedItems[0] = item;
                    this.model.set('_selectedItem', selectedItems);
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
            this.model.set('_items', items);
        },

        markQuestion: function() {
            this.setCompletionStatus();
        },

        setupFeedback: function(){
            this.model.set('feedbackTitle', this.model.get('title'));
            this.model.set('feedbackMessage', this.getFeedbackString());
        },

        updateButtons: function() {
            var $submitButton = this.$('.buttons-action');
            $submitButton.addClass('disabled');
            $submitButton.attr('disabled', 'disabled');
        },

        setupFeedbackArrays: function() {
            // intentionally blank
        },

        getFeedbackString: function() {
            var feedbackSeparator = this.model.get('_feedback').feedbackSeparator,
                genericFeedback = this.getGenericFeedback(),
                thresholdFeedback = this.getThresholdFeedback(),
                needsSeparator = false,
                feedbackString = "";

            if(genericFeedback) {
                feedbackString += genericFeedback;
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
		
		storeUserAnswer: function() {
            this.model.set('_userAnswer', this.getSelectedItems()[0].value);
        },

        onUserAnswerShown: function() {
            if(this.model.get('_userAnswer').length > 0) {
                Slider.prototype.onUserAnswerShown.apply(this);
            }
        }
    },
    {
        template: 'confidenceSlider'
    });
    
    Adapt.register("confidenceSlider", ConfidenceSlider);
    
    return ConfidenceSlider;
});
