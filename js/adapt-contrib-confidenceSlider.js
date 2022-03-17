import Adapt from 'core/js/adapt';
import ConfidenceSliderView from './confidenceSliderView';
import ConfidenceSliderModel from './confidenceSliderModel';

export default Adapt.register('confidenceSlider', {
  view: ConfidenceSliderView,
  model: ConfidenceSliderModel
});
