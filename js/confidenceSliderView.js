define([
  'core/js/adapt',
  'components/adapt-contrib-slider/js/sliderView',
], function(Adapt, SliderView) {

  var ConfidenceSliderView = SliderView.extend({

    /* override */
    preRender:function() {
      if (this.model.has('_linkedModel') && this.model.get('_linkedModel').get('_isSubmitted') && !this.model.get('_isSubmitted')) {
        this.model.set('_isEnabled', true);
      }

      SliderView.prototype.preRender.apply(this, arguments);
    },

    /* override */
    setupQuestion: function() {
      if (this.model.get('_linkedToId')) {
        this.listenTo(Adapt, "buttonsView:postRender", this.onButtonsRendered);
      }
      SliderView.prototype.setupQuestion.apply(this, arguments);
    },

    /* override */
    disableQuestion: function() {
      if (this.model.get('_isReady')) this.setAllItemsEnabled(false);
      if (this.model.has('_linkedModel')) this.$('.js-btn-action').a11y_cntrl_enabled(false);
    },

    /* override */
    enableQuestion: function() {
      if (this.model.get('_isReady')) this.setAllItemsEnabled(true);
      if (this.model.has('_linkedModel')) this.$('.js-btn-action').a11y_cntrl_enabled(true);
    },

    _listenToLinkedModel: function() {
      this.listenTo(this.model.get('_linkedModel'), {
        'change:_selectedItem': this.onLinkedConfidenceChanged,
        'change:_isSubmitted': this.onLinkedSubmittedChanged
      });
    },

    _updateLinkedConfidenceIndicator: function() {
      var lm = this.model.get('_linkedModel');
      var linkedValue = 0;
      var rangeslider = this.$slider.data('plugin_rangeslider');

      linkedValue = lm.has('_userAnswer') ? lm.get('_userAnswer') : lm.get('_selectedItem').value;

      if (linkedValue == this.model.get('_scaleEnd')) {
        this.$('.confidenceslider__fill-linked').css({width: '100%'});
      }
      else {
        // follow rangeslider setPosition method
        this.$('.confidenceslider__fill-linked').css({width: (rangeslider.getPositionFromValue(linkedValue) + rangeslider.grabPos) + 'px'});
      }
    },

    onQuestionRendered: function() {
      SliderView.prototype.onQuestionRendered.apply(this, arguments);

      if (this.model.has('_linkedModel')) {
        this.$('.rangeslider').prepend($('<div class="confidenceslider__fill-linked"/>'));
        this._listenToLinkedModel();
        if (this.model.get('_linkedModel').get('_isSubmitted')) {
          this.onLinkedConfidenceChanged();
        } else {
          this.model.set('_isEnabled', false);
          this.$('.component__body-inner').html(this.model.get('disabledBody'));
        }
      }

      if (this.model.get('_isSubmitted') && this.model.has('_userAnswer')) {
        this.model.set({
          feedbackTitle: this.model.get('title'),
          feedbackMessage: this.model.getFeedbackString()
        });
      }
    },

    onScreenSizeChanged: function() {
      SliderView.prototype.onScreenSizeChanged.apply(this, arguments);

      // if linked slider on same page update it with user interaction
      if (this.model.has('_linkedModel') && this.model.get('_linkedModel').get('_isReady')) {
        this._updateLinkedConfidenceIndicator();
      }
    },

    onResetClicked: function() {
      SliderView.prototype.onResetClicked.apply(this, arguments);

      this.model.reset('soft', true);

      this.model.updateTracking();
    },

    onSubmitClicked: function() {
      SliderView.prototype.onSubmitClicked.apply(this, arguments);

      this.model.updateTracking();
    },

    onButtonsRendered: function(buttonsView) {
      // necessary due to deferred ButtonsView::postRender
      if (this.buttonsView == buttonsView) {
        if (!this.model.get('_isEnabled')) {
          if (!this.model.has('_linkedModel') || !this.model.get('_linkedModel').get('_isSubmitted')) {
            this.$('.js-btn-action').a11y_cntrl_enabled(false);
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

  });

  return ConfidenceSliderView;

});
