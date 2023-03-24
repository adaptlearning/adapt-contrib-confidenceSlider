import Adapt from 'core/js/adapt';
import SliderView from 'components/adapt-contrib-slider/js/SliderView';

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
    this.listenTo(Adapt, 'buttonsView:postRender', this.onButtonsRendered);
    super.setupQuestion();
  }

  _listenToLinkedModel() {
    this.listenTo(this.model.linkedModel, {
      'change:_isSubmitted': this.onLinkedSubmittedChanged
    });
  }

  onQuestionRendered() {
    if (this.model.linkedModel) {
      this._listenToLinkedModel();
      if (!this.model.linkedModel.get('_isSubmitted')) {
        this.model.set('_isEnabled', false);
        this.model.set('body', this.model.get('disabledBody'));
      } else {
        this.model.set('_linkedModelSelectedIndex', this.model.linkedModel.get('_selectedItem').index);
      }
    }
    if (!(this.model.get('_isSubmitted') && this.model.has('_userAnswer'))) return;
    this.model.set({
      feedbackTitle: this.model.get('title'),
      feedbackMessage: this.model.getFeedbackString()
    });
  }

  onButtonsRendered(buttonsView) {
    if (this.buttonsView !== buttonsView) return;
    this.setReadyStatus();
  }

  onNumberSelected(value) {
    const index = this.getIndexFromValue(value);

    if (this.model.linkedModel) {
      if (!this.model.linkedModel.get('_isSubmitted')) return;
      const originalIndex = this.model.linkedModel.get('_selectedItem').index;
      this.model.set('_isLinkedHigher', index > originalIndex);
    }
    super.onNumberSelected(value);
  }

  onLinkedSubmittedChanged(linkedModel) {
    this.model.set('body', this.model.get('originalBody'));
    this.model.set('_isEnabled', (linkedModel.get('_isSubmitted') === true));
    this.model.set('_linkedModelSelectedIndex', linkedModel.get('_selectedItem').index);
    this.model.checkCanSubmit();
  }

}

ConfidenceSliderView.template = 'confidenceSlider.jsx';

export default ConfidenceSliderView;
