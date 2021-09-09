define([
  'core/js/adapt',
  './confidenceSliderView',
  './confidenceSliderModel'
], function(Adapt, ConfidenceSliderView, ConfidenceSliderModel) {

  return Adapt.register('confidenceSlider', {
    view: ConfidenceSliderView,
    model: ConfidenceSliderModel
  });

});
