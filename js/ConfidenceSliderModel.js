import Adapt from 'core/js/adapt';
import data from 'core/js/data';
import logging from 'core/js/logging';
import BUTTON_STATE from 'core/js/enums/buttonStateEnum';
import SliderModel from 'components/adapt-contrib-slider/js/SliderModel';

export default class ConfidenceSliderModel extends SliderModel {

  init() {
    super.init();
    if (!this.get('_linkedToId')) return;
    this.set('originalBody', this.get('body'));
  }

  /* override */
  setupDefaultSettings() {
    super.setupDefaultSettings();
    this.set('_canShowModelAnswer', false);
    if (!this.has('_attempts') || this.get('_attempts') > 1) this.set('_attempts', 1);
  }

  /* override to indicate that all options are correct */
  setupModelItems() {
    this._setupLinkedModel();
    const items = [];
    const start = this.get('_scaleStart');
    const end = this.get('_scaleEnd');
    const step = this.get('_scaleStep');
    for (let i = start; i <= end; i += step) {
      items.push({
        value: i,
        selected: false,
        correct: true
      });

      const index = items.length - 1;
      items[index].index = index;
    }
    this.set({
      _items: items,
      _marginDir: (Adapt.config.get('_defaultDirection') === 'rtl' ? 'right' : 'left')
    });
  }

  onAdaptInitialize() {
    this.updateFromLinkedModel();
    super.onAdaptInitialize();
  }

  /* override */
  canSubmit() {
    return (!this.linkedModel || this.linkedModel.get('_isSubmitted'));
  }

  /* override */
  updateButtons() {
    if (this.get('_attempts') > 0) return super.updateButtons();
    this.set('_buttonState', this.get('_isEnabled') ? BUTTON_STATE.SUBMIT : BUTTON_STATE.RESET);
  }

  /** @type {boolean} */
  isCorrect() {
    return true;
  }

  /** @type {boolean} */
  isPartlyCorrect() {
    return false;
  }

  // Used to set the score based upon the _questionWeight
  setScore() {
    this.set('_score', 0);
  }

  /** @type {number} */
  get score() {
    return 0;
  }

  /** @type {number} */
  get maxScore() {
    return 0;
  }

  /** @type {number} */
  get minScore() {
    return 0;
  }

  /* override */
  getFeedback(_feedback = this.get('_feedback')) {
    if (!_feedback) return {};
    const {
      altTitle = Adapt.course.get('_globals')._accessibility.altFeedbackTitle || '',
      title,
      _classes
    } = _feedback;
    return {
      altTitle,
      title,
      _classes,
      body: this.getFeedbackString()
    };
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

  updateFromLinkedModel() {
    if (!this.linkedModel) return;
    const isSubmitted = this.linkedModel.get('_isSubmitted');
    this.set('body', isSubmitted ? this.get('originalBody') : this.get('disabledBody'));
    this.set('_isEnabled', isSubmitted);
    if (isSubmitted) {
      this.set('_linkedModelSelectedIndex', this.linkedModel.get('_selectedItem').index);
    }
    this.checkCanSubmit();
  }

  _listenToLinkedModel() {
    this.listenTo(this.linkedModel, 'change:_isSubmitted', this.updateFromLinkedModel);
  }

  _setupLinkedModel() {
    const linkedToId = this.get('_linkedToId');
    if (!linkedToId) return;
    this.linkedModel = data.findById(linkedToId);
    if (!this.linkedModel) {
      return logging.error(`Could not find \`_linkedToId: ${linkedToId}\` for ${this.get('_id')}`);
    }
    if (this.linkedModel.get('_component') !== 'confidenceSlider') {
      return logging.warn(`The component you have linked confidenceSlider ${this.get('_id')} to is not a confidenceSlider component!`);
    }
    this.set({
      _isLinkedModel: true,
      _showNumber: this.linkedModel.get('_showNumber'),
      _showScaleIndicator: this.linkedModel.get('_showScaleIndicator'),
      _showScale: this.linkedModel.get('_showScale'),
      labelStart: this.linkedModel.get('labelStart'),
      labelEnd: this.linkedModel.get('labelEnd'),
      _scaleStart: this.linkedModel.get('_scaleStart'),
      _scaleEnd: this.linkedModel.get('_scaleEnd')
    });
    this._listenToLinkedModel();
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
