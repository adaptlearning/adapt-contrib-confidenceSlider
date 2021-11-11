import Adapt from 'core/js/adapt';
import SliderModel from 'components/adapt-contrib-slider/js/sliderModel';

export default class ConfidenceSliderModel extends SliderModel {

  init() {
    super.init();
    if (!this.get('_linkedToId')) return;
    this._setupLinkedModel();
  }

  /* override */
  setupDefaultSettings() {
    super.setupDefaultSettings();
    this.set('_canShowModelAnswer', false);
    if (!this.has('_attempts') || this.get('_attempts') > 1) this.set('_attempts', 1);
  }

  /* override to indicate that all options are correct */
  setupModelItems() {
    const items = [];
    const start = this.get('_scaleStart') ?? 1;
    const end = this.get('_scaleEnd') ?? 1;
    const step = this.get('_scaleStep') || 1;
    for (let i = start; i <= end; i += step) {
      items.push({
        value: i,
        selected: false,
        correct: true
      });
    }
    this.set({
      _items: items,
      _marginDir: (Adapt.config.get('_defaultDirection') === 'rtl' ? 'right' : 'left')
    });
  }

  /* override */
  canSubmit() {
    return (!this.linkedModel || this.linkedModel.get('_isSubmitted'));
  }

  /* override */
  setupFeedback() {
    this.set({
      feedbackTitle: this.get('title'),
      feedbackMessage: this.getFeedbackString()
    });
  }

  /* override */
  updateButtons() {
    if (this.get('_attempts') > 0) return super.updateButtons();
    this.set('_buttonState', this.get('_isEnabled') ? 'submit' : 'reset');
  }

  getFeedbackString() {
    const feedbackSeparator = this.get('_feedback').feedbackSeparator ?? '';
    const genericFeedback = this._getGenericFeedback();
    const comparisonFeedback = this._getComparisonFeedback();
    const thresholdFeedback = this._getThresholdFeedback();
    const feedbackString = [
      genericFeedback,
      comparisonFeedback,
      thresholdFeedback
    ].filter(Boolean).join(feedbackSeparator);
    return feedbackString;
  }

  _setupLinkedModel() {
    this.linkedModel = Adapt.components.findWhere({ _id: this.get('_linkedToId') });
    if (!this.linkedModel) {
      return Adapt.log.error('Please check that you have set _linkedToId correctly!');
    }
    if (this.linkedModel.get('_component') !== 'confidenceSlider') {
      return Adapt.log.warn(`The component you have linked confidenceSlider ${this.get('_id')} to is not a confidenceSlider component!`);
    }
    this.set({
      _showNumber: this.linkedModel.get('_showNumber'),
      _showScaleIndicator: this.linkedModel.get('_showScaleIndicator'),
      _showScale: this.linkedModel.get('_showScale'),
      labelStart: this.linkedModel.get('labelStart'),
      labelEnd: this.linkedModel.get('labelEnd'),
      _scaleStart: this.linkedModel.get('_scaleStart'),
      _scaleEnd: this.linkedModel.get('_scaleEnd')
    });
    if (this.get('_attempts') < 0) this.linkedModel.set('_attempts', 1);
  }

  _getGenericFeedback() {
    return this.get('_feedback').generic;
  }

  _getComparisonFeedback() {
    if (!this.linkedModel?.get('_isSubmitted')) return;
    const confidence = this.get('_selectedItem').value;
    const linkedConfidence = this.linkedModel.get('_userAnswer') ?? this.linkedModel.get('_selectedItem').value;
    const type = (linkedConfidence < confidence)
      ? 'higher'
      : (linkedConfidence > confidence)
        ? 'lower'
        : 'same';
    return this.get('_feedback')._comparison[type];
  }

  _getThresholdFeedback() {
    const feedbackList = this.get('_feedback')._threshold;
    if (!feedbackList) return;
    const confidenceValue = this.get('_selectedItem').value;
    return feedbackList.find(({ _values }) => {
      if (confidenceValue < _values._low || confidenceValue > _values._high) return false;
      return true;
    })?.text ?? '';
  }

}
