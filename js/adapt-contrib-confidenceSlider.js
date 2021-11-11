import Adapt from 'core/js/adapt';
import ConfidenceSliderView from './ConfidenceSliderView';
import ConfidenceSliderModel from './ConfidenceSliderModel';

export default Adapt.register('confidenceSlider', {
  view: ConfidenceSliderView,
  model: ConfidenceSliderModel
});
