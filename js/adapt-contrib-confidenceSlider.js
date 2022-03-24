import components from 'core/js/components';
import ConfidenceSliderView from './ConfidenceSliderView';
import ConfidenceSliderModel from './ConfidenceSliderModel';

export default components.register('confidenceSlider', {
  view: ConfidenceSliderView,
  model: ConfidenceSliderModel
});
