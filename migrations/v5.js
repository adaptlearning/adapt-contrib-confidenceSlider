import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, getComponents, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-contrib-confidenceSlider - v4.0.0 to v5.2.0', async () => {
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

describe('adapt-contrib-confidenceSlider - v5.2.0 to v5.2.3', async () => {
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

describe('adapt-contrib-confidenceSlider - v5.2.3 to v5.2.4', async () => {
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

describe('adapt-contrib-confidenceSlider - v5.2.4 to v5.4.4', async () => {
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

describe('adapt-contrib-confidenceSlider - v5.4.4 to v5.4.6', async () => {
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

describe('adapt-contrib-confidenceSlider - 5.7.0 to 5.8.0', async () => {
  let confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from 5.7.0', { name: 'adapt-contrib-confidenceSlider', version: '<5.8.0' });

  mutateContent('adapt-contrib-confidenceSlider - delete confidenceSlider._correctAnswer', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      if (_.has(confidenceSlider, '_correctAnswer')) {
        delete confidenceSlider._correctAnswer;
      }
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - delete confidenceSlider._correctRange', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      if (_.has(confidenceSlider, '_correctRange')) {
        delete confidenceSlider._correctRange;
      }
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - delete confidenceSlider._showCorrectAnswer', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      if (_.has(confidenceSlider, '_showCorrectAnswer')) {
        delete confidenceSlider._showCorrectAnswer;
      }
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - delete confidenceSlider._hideCorrectAnswer', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      if (_.has(confidenceSlider, '_hideCorrectAnswer')) {
        delete confidenceSlider._hideCorrectAnswer;
      }
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._correctAnswer is deleted', async () => {
    const isValid = confidenceSliders.every(({ _correctAnswer }) => _correctAnswer === null);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _correctAnswer not deleted from every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._correctRange is deleted', async () => {
    const isValid = confidenceSliders.every(({ _correctRange }) => _correctRange === null);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _correctRange not deleted from every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._showCorrectAnswer is deleted', async () => {
    const isValid = confidenceSliders.every(({ _showCorrectAnswer }) => _showCorrectAnswer === null);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _showCorrectAnswer not deleted from every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._hideCorrectAnswer is deleted', async () => {
    const isValid = confidenceSliders.every(({ _hideCorrectAnswer }) => _hideCorrectAnswer === null);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _hideCorrectAnswer not deleted from every instance of confidenceSlider');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to 5.8.0', { name: 'adapt-contrib-confidenceSlider', version: '5.8.0', framework: '>=5.19.1' });

  testSuccessWhere('non/configured confidenceSlider component with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.7.0' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider', _feedback: {} },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('non/configured confidenceSlider component with empty course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.7.0' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider', _feedback: {} },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course', _globals: { _components: { _confidenceSlider: {} } } }
    ]
  });

  testSuccessWhere('non/configured confidenceSlider component with course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.7.0' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider', _feedback: {} },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course', _globals: { _components: { _confidenceSlider: { labelStart: 1, labelEnd: 1 } } } }
    ]
  });

  testStopWhere('no confidenceSlider components', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.7.0' }],
    content: [
      { _component: 'other' },
      { _type: 'course' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '5.8.0' }]
  });
});
