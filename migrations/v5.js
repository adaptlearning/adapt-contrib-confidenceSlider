import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, getComponents, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-contrib-confidenceSlider - v4.0.0 > v5.2.0', async () => {
  let course, courseConfidenceSliderGlobals, confidenceSliders;
  const ariaUserAnswer = 'Earlier in the course, you provided {{{linkedValue}}} as an answer to this question.';

  whereFromPlugin('adapt-contrib-confidenceSlider - from v4.0.0', { name: 'adapt-contrib-confidenceSlider', version: '<5.2.0' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = getComponents('confidenceSlider');
    return confidenceSliders.length;
  });

  mutateContent('adapt-contrib-confidenceSlider - add globals ariaUserAnswer attribute', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._components._confidenceSlider')) _.set(course, '_globals._components._confidenceSlider', {});
    courseConfidenceSliderGlobals = course._globals._components._confidenceSlider;
    courseConfidenceSliderGlobals.ariaUserAnswer = ariaUserAnswer;
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check globals ariaUserAnswer attribute', async (content) => {
    const isValid = courseConfidenceSliderGlobals.ariaUserAnswer === ariaUserAnswer;
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - globals ariaUserAnswer attribute not added.');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v5.2.0', { name: 'adapt-contrib-confidenceSlider', version: '5.2.0', framework: '>=5.19.1' });

  testSuccessWhere('non/configured confidenceSlider component with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '4.0.0' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider' },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('non/configured confidenceSlider component with course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '4.0.0' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider' },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course', _globals: { _components: { _confidenceSlider: {} } } }
    ]
  });

  testStopWhere('no confidenceSlider components', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '4.0.0' }],
    content: [
      { _component: 'other' },
      { _type: 'course' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.2.0' }]
  });
});

describe('adapt-contrib-confidenceSlider - v5.2.0 > v5.2.3', async () => {
  let confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from v5.2.0', { name: 'adapt-contrib-confidenceSlider', version: '<5.2.3' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = getComponents('confidenceSlider').filter(confidenceSlider => confidenceSlider._feedback);
    return confidenceSliders.length;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._feedback.title', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._feedback.title = '';
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._feedback.altTitle', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._feedback.altTitle = '';
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._feedback.title attribute', async () => {
    const isValid = confidenceSliders.every(({ _feedback }) => _feedback.title === '');
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _feedback.title not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._feedback.altTitle attribute', async () => {
    const isValid = confidenceSliders.every(({ _feedback }) => _feedback.altTitle === '');
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _feedback.altTitle not added to every instance of confidenceSlider');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v5.2.3', { name: 'adapt-contrib-confidenceSlider', version: '5.2.3', framework: '>=5.19.1' });

  testSuccessWhere('non/configured confidenceSlider component with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '4.0.0' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider', _feedback: {} },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('non/configured confidenceSlider component with course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '4.0.0' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider', _feedback: {} },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course', _globals: { _components: { _confidenceSlider: {} } } }
    ]
  });

  testStopWhere('no confidenceSlider components', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '4.0.0' }],
    content: [
      { _component: 'other' },
      { _type: 'course' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.2.0' }]
  });
});

describe('adapt-contrib-confidenceSlider - v5.2.3 > v5.2.4', async () => {
  let confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from v5.2.3', { name: 'adapt-contrib-confidenceSlider', version: '<5.2.4' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = getComponents('confidenceSlider');
    return confidenceSliders.length;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider.ariaQuestion', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider.ariaQuestion = '';
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._feedback.altTitle', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      _.set(confidenceSlider, '_feedback.altTitle', '');
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider.ariaQuestion attribute', async () => {
    const isValid = confidenceSliders.every(({ ariaQuestion }) => ariaQuestion === '');
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - ariaQuestion not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._feedback.altTitle atrribute', async () => {
    const isValid = confidenceSliders.every(({ _feedback }) => _feedback.altTitle === '');
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _feedback.altTitle not added to every instance of confidenceSlider');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v5.2.4', { name: 'adapt-contrib-confidenceSlider', version: '5.2.4', framework: '>=5.19.1' });

  testSuccessWhere('non/configured confidenceSlider component with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.2.3' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider', _feedback: {} },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course' }
    ]
  });

  testStopWhere('no confidenceSlider components', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.2.3' }],
    content: [
      { _component: 'other' },
      { _type: 'course' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.2.4' }]
  });
});

describe('adapt-contrib-confidenceSlider - v5.2.4 > v5.4.4', async () => {
  let course, courseConfidenceSliderGlobals, confidenceSliders;
  const newLabelStart = 'Start of the scale';
  const newLabelEnd = 'End of the scale';

  whereFromPlugin('adapt-contrib-confidenceSlider - from v5.2.4', { name: 'adapt-contrib-confidenceSlider', version: '<5.4.4' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = getComponents('confidenceSlider');
    return confidenceSliders.length;
  });

  mutateContent('adapt-contrib-confidenceSlider - check for globals', async () => {
    course = getCourse();
    if (!_.has(course, '_globals._components._confidenceSlider')) _.set(course, '_globals._components._confidenceSlider', {});
    courseConfidenceSliderGlobals = course._globals._components._confidenceSlider;
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - modify globals labelStart attribute', async (content) => {
    const labelStart = courseConfidenceSliderGlobals.labelStart || newLabelStart;
    courseConfidenceSliderGlobals.labelStart = String(labelStart);
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - modify globals labelEnd attribute', async (content) => {
    const labelEnd = courseConfidenceSliderGlobals.labelEnd || newLabelEnd;
    courseConfidenceSliderGlobals.labelEnd = String(labelEnd);
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - modify globals labelStart attribute', async (content) => {
    const isValid = typeof (courseConfidenceSliderGlobals.labelStart) === 'string';
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - globals labelStart attribute not modified.');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - modify globals labelEnd attribute', async (content) => {
    const isValid = typeof (courseConfidenceSliderGlobals.labelEnd) === 'string';
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - globals labelEnd attribute not modified.');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v5.4.4', { name: 'adapt-contrib-confidenceSlider', version: '5.4.4', framework: '>=5.19.1' });

  testSuccessWhere('non/configured confidenceSlider component with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.4.3' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider', _feedback: {} },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('non/configured confidenceSlider component with empty course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.4.3' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider', _feedback: {} },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course', _globals: { _components: { _confidenceSlider: {} } } }
    ]
  });

  testSuccessWhere('non/configured confidenceSlider component with course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.4.3' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider', _feedback: {} },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course', _globals: { _components: { _confidenceSlider: { labelStart: 1, labelEnd: 1 } } } }
    ]
  });

  testStopWhere('no confidenceSlider components', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.4.3' }],
    content: [
      { _component: 'other' },
      { _type: 'course' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.4.4' }]
  });
});

describe('adapt-contrib-confidenceSlider - v5.4.4 > v5.4.6', async () => {
  let confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from v5.4.4', { name: 'adapt-contrib-confidenceSlider', version: '<5.4.6' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = getComponents('confidenceSlider');
    return confidenceSliders.length;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider.ariaScaleName', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider.ariaScaleName = 'confidence';
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider.ariaScaleName attribute', async () => {
    const isValid = confidenceSliders.every(({ ariaScaleName }) => ariaScaleName !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - ariaScaleName not added to every instance of confidenceSlider');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v5.4.6', { name: 'adapt-contrib-confidenceSlider', version: '5.4.6', framework: '>=5.19.1' });

  testSuccessWhere('non/configured confidenceSlider component with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.2.3' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider', _feedback: {} },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('non/configured confidenceSlider component with empty course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.2.3' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider', _feedback: {} },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course', _globals: { _components: { _confidenceSlider: {} } } }
    ]
  });

  testSuccessWhere('non/configured confidenceSlider component with course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.2.3' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider', _feedback: {} },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course', _globals: { _components: { _confidenceSlider: { labelStart: 1, labelEnd: 1 } } } }
    ]
  });

  testStopWhere('no confidenceSlider components', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.2.3' }],
    content: [
      { _component: 'other' },
      { _type: 'course' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.2.4' }]
  });
});

describe('adapt-contrib-confidenceSlider - @@CURRENT_VERSION > @@RELEASE_VERSION', async () => {
  let confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from @@CURRENT_VERSION', { name: 'adapt-contrib-confidenceSlider', version: '<@@RELEASE_VERSION' });

  updatePlugin('adapt-contrib-confidenceSlider - update to @@RELEASE_VERSION', { name: 'adapt-contrib-confidenceSlider', version: '@@RELEASE_VERSION', framework: '>=5.19.1' });

  testSuccessWhere('non/configured confidenceSlider component with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '@@CURRENT_VERSION' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider', _feedback: {} },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('non/configured confidenceSlider component with empty course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '@@CURRENT_VERSION' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider', _feedback: {} },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course', _globals: { _components: { _confidenceSlider: {} } } }
    ]
  });

  testSuccessWhere('non/configured confidenceSlider component with course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '@@CURRENT_VERSION' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider', _feedback: {} },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course', _globals: { _components: { _confidenceSlider: { labelStart: 1, labelEnd: 1 } } } }
    ]
  });

  testStopWhere('no confidenceSlider components', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '@@CURRENT_VERSION' }],
    content: [
      { _component: 'other' },
      { _type: 'course' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '@@RELEASE_VERSION' }]
  });
});
