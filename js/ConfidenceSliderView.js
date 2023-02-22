import Adapt from 'core/js/adapt';
import SliderView from 'components/adapt-contrib-slider/js/SliderView';
import a11y from 'core/js/a11y';

class ConfidenceSliderView extends SliderView {

  /* override */
  preRender() {
    if (this.model.linkedModel?.get('_isSubmitted') && !this.model.get('_isSubmitted')) {
      this.model.set('_isEnabled', true);
    }
    super.preRender();
  }

  /* override */
  setupQuestion() {
    if (this.model.get('_linkedToId')) {
      this.listenTo(Adapt, 'buttonsView:postRender', this.onButtonsRendered);
    }
    super.setupQuestion();
  }

  /* override */
  disableQuestion() {
    if (this.model.get('_isReady')) this.setAllItemsEnabled(false);
    if (!this.model.linkedModel) return;
    a11y.toggleEnabled(this.$('.js-btn-action'), false);
  }

  /* override */
  enableQuestion() {
    if (this.model.get('_isReady')) this.setAllItemsEnabled(true);
    if (!this.model.linkedModel) return;
    a11y.toggleEnabled(this.$('.js-btn-action'), true);
  }

  _listenToLinkedModel() {
    this.listenTo(this.model.linkedModel, {
      'change:_selectedItem': this.onLinkedConfidenceChanged,
      'change:_isSubmitted': this.onLinkedSubmittedChanged
    });
  }

  _updateLinkedConfidenceIndicator() {
    const linkedModel = this.model.linkedModel;
    const rangeslider = this.$slider.data('plugin_rangeslider');
    const linkedValue = linkedModel.has('_userAnswer')
      ? linkedModel.get('_userAnswer')
      : linkedModel.get('_selectedItem').value;
    if (linkedValue === this.model.get('_scaleEnd')) {
      this.$('.confidenceslider__fill-linked').css({ width: '100%' });
      return;
    }

    // Add previous answer aria-label to linked slider if exists
    const globals = Adapt.course.get('_globals');
    const ariaLabelUserAnswer = globals._components._confidenceSlider.ariaUserAnswer;
    this.$('.js-slider-item-input').attr('aria-label', Handlebars.helpers.compile_a11y_normalize(ariaLabelUserAnswer, {
      linkedValue: linkedValue
    }));

    // follow rangeslider setPosition method
    this.$('.confidenceslider__fill-linked').css({ width: (rangeslider.getPositionFromValue(linkedValue) + rangeslider.grabPos) + 'px' });
  }

  onQuestionRendered() {
    super.onQuestionRendered();
    if (this.model.linkedModel) {
      this.$('.rangeslider').prepend($('<div class="confidenceslider__fill-linked"/>'));
      this._listenToLinkedModel();
      if (this.model.linkedModel.get('_isSubmitted')) {
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
    super.onScreenSizeChanged();
    // if linked slider on same page update it with user interaction
    if (!this.model.linkedModel?.get('_isReady')) return;
    this._updateLinkedConfidenceIndicator();
  }

  onButtonsRendered(buttonsView) {
    if (this.buttonsView !== buttonsView) return;
    // necessary due to deferred ButtonsView::postRender
    const isLinkedModelSubmitted = this.model.linkedModel?.get('_isSubmitted');
    if (this.model.get('_isEnabled') && isLinkedModelSubmitted) return;
    a11y.toggleEnabled(this.$('.js-btn-action'), false);
  }

  onLinkedConfidenceChanged() {
    this._updateLinkedConfidenceIndicator();
  }

  onLinkedSubmittedChanged(linkedModel) {
    this.$('.component__body-inner').html(this.model.get('body'));
    this.model.set('_isEnabled', (linkedModel.get('_isSubmitted') === true));
  }

}

ConfidenceSliderView.template = 'confidenceSlider.jsx';

export default ConfidenceSliderView;
