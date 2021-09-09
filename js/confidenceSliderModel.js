import Adapt from 'core/js/adapt';
import SliderModel from 'components/adapt-contrib-slider/js/sliderModel';

export default class ConfidenceSliderModel extends SliderModel {

  init() {
    super.init(this);

    if (!this.get('_linkedToId')) return;
    this._setupLinkedModel();
  }

  /* override */
  setupDefaultSettings() {
    super.setupDefaultSettings(this, arguments);
    this.set('_canShowModelAnswer', false);
    if (!this.has('_attempts') || this.get('_attempts') > 1) this.set('_attempts', 1);
  }

  /* override to indicate that all options are correct */
  setupModelItems() {
    const items = [];
    const start = this.get('_scaleStart');
    const end = this.get('_scaleEnd');
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
  restoreUserAnswers() {
    if (!this.get('_isSubmitted')) {
      this.set({
        _selectedItem: {},
        _userAnswer: undefined
      });
      return;
    }

    // this is only necessary to avoid an issue when using adapt-devtools
    if (!this.has('_userAnswer')) this.set('_userAnswer', this.get('_items')[0].value);

    super.restoreUserAnswers(this, arguments);
  }

  /* override */
  canSubmit() {
    return (!this.has('_linkedModel') || this.get('_linkedModel').get('_isSubmitted'));
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
    if (this.get('_attempts') > 0) {
      super.updateButtons(this, arguments);
      return;
    }
    this.set('_buttonState', this.get('_isEnabled') ? 'submit' : 'reset');
  }

  updateTracking() {
    const shouldTrackResponses = (this.get('_shouldStoreResponses'));
    const isSpoorEnabled = (Adapt.config.has('_spoor')?._isEnabled);
    const shouldStoreResponses = (Adapt.config.get('_spoor')?._tracking?._shouldStoreResponses);
    if (!shouldTrackResponses && !isSpoorEnabled && shouldStoreResponses) return;
    // write custom tracking data
    Adapt.offlineStorage.set(this.get('_id'), this._getTrackingData());
  }

  getFeedbackString() {
    const feedbackSeparator = this.get('_feedback').feedbackSeparator;
    const genericFeedback = this._getGenericFeedback();
    const comparisonFeedback = this.get('_linkedModel')?.get('_isSubmitted') ? this._getComparisonFeedback() : null;
    const thresholdFeedback = this._getThresholdFeedback();
    let needsSeparator = false;
    let feedbackString = '';

    if (genericFeedback) {
      feedbackString += genericFeedback;
      needsSeparator = true;
    }
    if (comparisonFeedback) {
      if (needsSeparator) feedbackString += feedbackSeparator;
      feedbackString += comparisonFeedback;
      if (!needsSeparator) needsSeparator = true;
    }
    if (thresholdFeedback) {
      if (needsSeparator) feedbackString += feedbackSeparator;
      feedbackString += thresholdFeedback;
    }

    return feedbackString;
  }

  _setupLinkedModel() {
    const linkedModel = Adapt.components.findWhere({ _id: this.get('_linkedToId') });

    if (!linkedModel) {
      Adapt.log.error('Please check that you have set _linkedToId correctly!');
      return;
    }

    if (linkedModel.get('_component') !== 'confidenceSlider') {
      Adapt.log.warn(`The component you have linked confidenceSlider ${this.get('_id')} to is not a confidenceSlider component!`);
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
  }

  _getGenericFeedback() {
    return this.get('_feedback').generic;
  }

  _getComparisonFeedback() {
    const lm = this.get('_linkedModel');
    const confidence = this.get('_selectedItem').value;
    const linkedConfidence = lm.get('_userAnswer') ?? lm.get('_selectedItem').value;
    if (linkedConfidence < confidence) {
      return this.get('_feedback')._comparison.higher;
    }
    if (linkedConfidence > confidence) {
      return this.get('_feedback')._comparison.lower;
    }
    return this.get('_feedback')._comparison.same;
  }

  _getThresholdFeedback() {
    const feedbackList = this.get('_feedback')._threshold;

    if (!feedbackList) return;

    const confidenceValue = this.get('_selectedItem').value;

    for (let i = 0, j = feedbackList.length; i < j; i++) {
      const feedback = feedbackList[i];
      const values = feedback._values;

      if (confidenceValue >= values._low && confidenceValue <= values._high) {
        return feedback.text;
      }
    }
  }

  _getTrackingData() {
    if (this.get('_isInteractionComplete') === false || this.get('_isComplete') === false) {
      return null;
    }

    const hasUserAnswer = (this.get('_userAnswer') !== undefined);
    const isUserAnswerArray = (this.get('_userAnswer') instanceof Array);

    const numericParameters = [
      this.get('_score') || 0,
      this.get('_attemptsLeft') || 0
    ];

    const booleanParameters = [
      hasUserAnswer ? 1 : 0,
      isUserAnswerArray ? 1 : 0,
      this.get('_isInteractionComplete') ? 1 : 0,
      this.get('_isSubmitted') ? 1 : 0,
      this.get('_isCorrect') ? 1 : 0
    ];

    const data = [
      numericParameters,
      booleanParameters
    ];

    if (hasUserAnswer) {
      const userAnswer = isUserAnswerArray ? this.get('_userAnswer') : [this.get('_userAnswer')];
      data.push(userAnswer);
    }

    return data;
  }

}
