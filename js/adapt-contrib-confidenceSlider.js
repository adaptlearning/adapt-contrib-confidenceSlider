import Adapt from 'core/js/adapt';
import ConfidenceSliderView from './ConfidenceSliderView';
import ConfidenceSliderModel from './ConfidenceSliderModel';

class ConfidenceSlider extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, 'app:dataReady', this.onDataReady);
  }

  onDataReady() {
    // ensure data is setup
    Adapt.offlineStorage.get();

    Adapt.components.where({
      _component: 'confidenceSlider',
      _shouldStoreResponses: true
    }).forEach((confidenceSlider) => {
      const dataItem = Adapt.offlineStorage.get(confidenceSlider.get('_id'));

      if (!dataItem) return;

      const numericParameters = dataItem[0];
      const booleanParameters = dataItem[1];

      const _score = numericParameters[0];
      const _attemptsLeft = numericParameters[1] || 0;
      const _isInteractionComplete = booleanParameters[2];
      const _isSubmitted = booleanParameters[3];
      const _isCorrect = booleanParameters[4];

      confidenceSlider.set({
        _isComplete: true,
        _isInteractionComplete,
        _isSubmitted,
        _score,
        _isCorrect,
        _attemptsLeft
      });

      const hasUserAnswer = booleanParameters[0];
      const isUserAnswerArray = booleanParameters[1];
      if (!hasUserAnswer) return;
      let userAnswer = dataItem[2];
      if (!isUserAnswerArray) userAnswer = userAnswer[0];

      confidenceSlider.set('_userAnswer', userAnswer);
    });
  }
}

Adapt.register('confidenceSlider', {
  view: ConfidenceSliderView,
  model: ConfidenceSliderModel
});

export default ConfidenceSlider;
