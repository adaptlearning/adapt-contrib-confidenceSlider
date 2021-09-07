define([
  'core/js/adapt',
  'components/adapt-contrib-slider/js/sliderView',
], function(Adapt, SliderView) {

  class ConfidenceSliderView extends SliderView {

    /* override */
    preRender() {
      if (this.model.has('_linkedModel') && this.model.get('_linkedModel').get('_isSubmitted') && !this.model.get('_isSubmitted')) {
        this.model.set('_isEnabled', true);
      }

      super.preRender(this, arguments);
    }

    /* override */
    setupQuestion() {
      if (this.model.get('_linkedToId')) {
        this.listenTo(Adapt, 'buttonsView:postRender', this.onButtonsRendered);
      }

      super.setupQuestion(this, arguments);
    }

    /* override */
    disableQuestion() {
      if (this.model.get('_isReady')) this.setAllItemsEnabled(false);
      if (this.model.has('_linkedModel')) this.$('.js-btn-action').a11y_cntrl_enabled(false);
    }

    /* override */
    enableQuestion() {
      if (this.model.get('_isReady')) this.setAllItemsEnabled(true);
      if (this.model.has('_linkedModel')) this.$('.js-btn-action').a11y_cntrl_enabled(true);
    }

    _listenToLinkedModel() {
      this.listenTo(this.model.get('_linkedModel'), {
        'change:_selectedItem': this.onLinkedConfidenceChanged,
        'change:_isSubmitted': this.onLinkedSubmittedChanged
      });
    }

    _updateLinkedConfidenceIndicator() {
      const lm = this.model.get('_linkedModel');
      const rangeslider = this.$slider.data('plugin_rangeslider');

      const linkedValue = lm.has('_userAnswer') ? lm.get('_userAnswer') : lm.get('_selectedItem').value;

      if (linkedValue === this.model.get('_scaleEnd')) {
        this.$('.confidenceslider__fill-linked').css({ width: '100%' });
        return;
      }
      // follow rangeslider setPosition method
      this.$('.confidenceslider__fill-linked').css({ width: (rangeslider.getPositionFromValue(linkedValue) + rangeslider.grabPos) + 'px' });
    }

    onQuestionRendered() {
      super.onQuestionRendered(this, arguments);

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

      if (!(this.model.get('_isSubmitted') && this.model.has('_userAnswer'))) return;
      this.model.set({
        feedbackTitle: this.model.get('title'),
        feedbackMessage: this.model.getFeedbackString()
      });
    }

    onScreenSizeChanged() {
      super.onScreenSizeChanged(this, arguments);

      // if linked slider on same page update it with user interaction
      if (!this.model.get('_linkedModel')?.get('_isReady')) return;
      this._updateLinkedConfidenceIndicator();
    }

    onResetClicked() {
      super.onResetClicked(this, arguments);

      this.model.reset('soft', true);

      this.model.updateTracking();
    }

    onSubmitClicked() {
      super.onSubmitClicked(this, arguments);

      this.model.updateTracking();
    }

    onButtonsRendered(buttonsView) {
      // necessary due to deferred ButtonsView::postRender
      const isLinkedModelSubmitted = this.model.get('_linkedModel')?.get('_isSubmitted');
      if (this.buttonsView !== buttonsView && this.model.get('_isEnabled') && isLinkedModelSubmitted) return;
      this.$('.js-btn-action').a11y_cntrl_enabled(false);
    }

    onLinkedConfidenceChanged() {
      this._updateLinkedConfidenceIndicator();
    }

    onLinkedSubmittedChanged(linkedModel) {
      if (linkedModel.get('_isSubmitted')) {
        this.model.set('_isEnabled', true);
        return;
      }
      this.model.set('_isEnabled', false);
    }

  }

  return ConfidenceSliderView;

});
