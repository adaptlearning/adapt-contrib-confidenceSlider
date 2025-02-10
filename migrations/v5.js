import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';

describe('adapt-contrib-confidenceSlider - v4.0.0 > v5.2.0', async () => {
  let course, courseConfidenceSliderGlobals, confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from v4.0.0', { name: 'adapt-contrib-confidenceSlider', version: '<5.2.0' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = content.filter(({ _component }) => _component === 'confidenceSlider');
    return confidenceSliders.length;
  });

  /**
    * * Add an attribute value within course globals.
    */
  mutateContent('adapt-contrib-confidenceSlider - modify globals labelStart attribute', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
    if (!_.has(course, '_globals._components._confidenceSlider')) _.set(course, '_globals._components._confidenceSlider', {});
    courseConfidenceSliderGlobals = course._globals._components._confidenceSlider;

    courseConfidenceSliderGlobals.ariaUserAnswer = 'Earlier in the course, you provided {{{linkedValue}}} as an answer to this question.';

    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - modify globals ariaUserAnswer attribute', async (content) => {
    const isValid = courseConfidenceSliderGlobals.ariaUserAnswer === 'Earlier in the course, you provided {{{linkedValue}}} as an answer to this question.';
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - globals ariaUserAnswer attribute not added.');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v5.2.0', { name: 'adapt-contrib-confidenceSlider', version: '5.2.0', framework: '>=5.19.1' });
});
