import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, getComponents, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-contrib-confidenceSlider - v2.2.0 > v4.0.0', async () => {
  let course, courseConfidenceSliderGlobals, confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from v2.2.0', { name: 'adapt-contrib-confidenceSlider', version: '<4.0.0' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = getComponents('confidenceSlider');
    return confidenceSliders.length;
  });

  mutateContent('adapt-contrib-confidenceSlider - modify globals labelStart attribute', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._components._confidenceSlider')) _.set(course, '_globals._components._confidenceSlider', {});
    courseConfidenceSliderGlobals = course._globals._components._confidenceSlider;
    courseConfidenceSliderGlobals.labelStart = 1;
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - modify globals labelEnd attribute', async (content) => {
    courseConfidenceSliderGlobals = course._globals._components._confidenceSlider;
    courseConfidenceSliderGlobals.labelEnd = 1;
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - modify globals labelStart attribute', async (content) => {
    const isValid = courseConfidenceSliderGlobals.labelStart === 1;
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - globals labelStart attribute not added.');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - modify globals labelEnd attribute', async (content) => {
    const isValid = courseConfidenceSliderGlobals.labelEnd === 1;
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - globals labelEnd attribute not added.');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v4.0.0', { name: 'adapt-contrib-confidenceSlider', version: '4.0.0', framework: '>=5.18.3' });

  testSuccessWhere('non/configured confidenceSlider component with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.2.0' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider' },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('non/configured confidenceSlider component with course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.2.0' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider' },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course', _globals: { _components: { _confidenceSlider: {} } } }
    ]
  });

  testSuccessWhere('non/configured confidenceSlider component with custom course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.2.0' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider' },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course', _globals: { _components: { _confidenceSlider: { ariaRegion: 'custom ariaRegion' } } } }
    ]
  });

  testStopWhere('no confidenceSlider components', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.2.0' }],
    content: [
      { _component: 'other' },
      { _type: 'course' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '4.0.0' }]
  });
});
