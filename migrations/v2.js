import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, getComponents, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-contrib-confidenceSlider - v2.0.0 > v2.1.0', async () => {
  let confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from v2.0.0', { name: 'adapt-contrib-confidenceSlider', version: '>=2.0.0 <2.1.0' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = getComponents('confidenceSlider');
    return confidenceSliders.length;
  });

  mutateContent('adapt-contrib-confidenceSlider - remove confidenceSlider.axisLabel attribute', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      _.unset(confidenceSlider, 'axisLabel');
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider.disabledBody', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider.disabledBody = '';
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._attempts', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._attempts = 1;
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._shouldDisplayAttempts', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._shouldDisplayAttempts = false;
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._questionWeight', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._questionWeight = 1;
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._recordInteraction', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._recordInteraction = true;
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._linkedToId', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._linkedToId = '';
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider.labelStart', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider.labelStart = confidenceSlider._scale?.labels?.low || '';
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider.labelEnd', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider.labelEnd = confidenceSlider._scale?.labels?.high || '';
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._scaleStart', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._scaleStart = confidenceSlider._scale?._low || 1;
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._scaleEnd', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._scaleEnd = confidenceSlider._scale?._high || 1;
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._scaleStep', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._scaleStep = 1;
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._correctAnswer', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._correctAnswer = '';
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._correctRange._bottom', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      _.set(confidenceSlider, '_correctRange._bottom', 0);
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._correctRange._top', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      _.set(confidenceSlider, '_correctRange._top', 0);
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._showNumber', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._showNumber = true;
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._showScaleIndicator', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._showScaleIndicator = true;
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._showScale', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._showScale = true;
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._showScale', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._showScale = true;
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._comparison', async () => {
    const defaultComparison = {
      lower: '',
      same: '',
      higher: ''
    };
    confidenceSliders.forEach(confidenceSlider => {
      _.set(confidenceSlider, '_feedback._comparison', { ...defaultComparison });
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._shouldStoreResponses', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._shouldStoreResponses = false;
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - remove confidenceSlider._scale object', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      _.unset(confidenceSlider, '_scale');
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider.axisLabel attribute', async () => {
    const isValid = confidenceSliders.every(confidenceSlider => !_.has(confidenceSlider, 'axisLabel'));
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - axisLabel not removed from confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider.disabledBody atrribute', async () => {
    const isValid = confidenceSliders.every(({ disabledBody }) => disabledBody !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - disabledBody not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._attempts atrribute', async () => {
    const isValid = confidenceSliders.every(({ _attempts }) => _attempts === 1);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _attempts not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._shouldDisplayAttempts atrribute', async () => {
    const isValid = confidenceSliders.every(({ _shouldDisplayAttempts }) => _shouldDisplayAttempts === false);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _shouldDisplayAttempts not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._questionWeight atrribute', async () => {
    const isValid = confidenceSliders.every(({ _questionWeight }) => _questionWeight === 1);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _questionWeight not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._recordInteraction atrribute', async () => {
    const isValid = confidenceSliders.every(({ _recordInteraction }) => _recordInteraction === true);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _attempts not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._linkedToId atrribute', async () => {
    const isValid = confidenceSliders.every(({ _linkedToId }) => _linkedToId !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _linkedToId not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider.labelStart atrribute', async () => {
    const isValid = confidenceSliders.every(({ labelStart }) => labelStart !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - labelStart not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider.labelEnd atrribute', async () => {
    const isValid = confidenceSliders.every(({ labelEnd }) => labelEnd !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - labelEnd not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._scaleStart atrribute', async () => {
    const isValid = confidenceSliders.every(({ _scaleStart }) => _scaleStart !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _scaleStart not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._scaleEnd atrribute', async () => {
    const isValid = confidenceSliders.every(({ _scaleEnd }) => _scaleEnd !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _scaleEnd not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._scaleStep atrribute', async () => {
    const isValid = confidenceSliders.every(({ _scaleStep }) => _scaleStep !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _scaleStep not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._correctAnswer atrribute', async () => {
    const isValid = confidenceSliders.every(({ _correctAnswer }) => _correctAnswer !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _correctAnswer not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._scale attribute has been removed', async () => {
    const isValid = confidenceSliders.every(({ _scale }) => _scale === undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _scale not removed from confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._correctRange._bottom atrribute', async () => {
    const isValid = confidenceSliders.every(({ _correctRange }) => _correctRange._bottom === 0);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _correctRange._bottom not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._correctRange._top atrribute', async () => {
    const isValid = confidenceSliders.every(({ _correctRange }) => _correctRange._top === 0);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _correctRange._top not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._showNumber atrribute', async () => {
    const isValid = confidenceSliders.every(({ _showNumber }) => _showNumber === true);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _showNumber not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._showScaleIndicator atrribute', async () => {
    const isValid = confidenceSliders.every(({ _showScaleIndicator }) => _showScaleIndicator === true);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _showScaleIndicator not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._showScale atrribute', async () => {
    const isValid = confidenceSliders.every(({ _showScale }) => _showScale === true);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _showScale not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._showScale atrribute', async () => {
    const isValid = confidenceSliders.every(({ _showScale }) => _showScale === true);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _showScale not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._feedback._comparison atrribute', async () => {
    const isValid = confidenceSliders.every(({ _feedback }) => _feedback._comparison !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _feedback._comparison not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._shouldStoreResponses atrribute', async () => {
    const isValid = confidenceSliders.some(({ _shouldStoreResponses }) => _shouldStoreResponses === false);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _shouldStoreResponses not added to every instance of confidenceSlider');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v2.1.0', { name: 'adapt-contrib-confidenceSlider', version: '2.1.0', framework: '2.0.0' });

  testSuccessWhere('non/configured confidenceSlider component with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.0.0' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider' },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('non/configured confidenceSlider component with course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.0.0' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider' },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course', _globals: { _components: { _confidenceSlider: {} } } }
    ]
  });

  testStopWhere('no confidenceSlider components', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.0.0' }],
    content: [
      { _component: 'other' },
      { _type: 'course' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.1.0' }]
  });
});

describe('adapt-contrib-confidenceSlider - v2.1.0 > v2.1.3', async () => {
  let course, courseConfidenceSliderGlobals, confidenceSliders;
  const originalAriaRegion = 'This component requires you to answer the question by selecting the relevant value. After selecting a value select the submit button below.';
  const newAriaRegion = 'Answer the question by selecting a value from the range. Once you have done so, select the submit button below.';

  whereFromPlugin('adapt-contrib-confidenceSlider - from v2.1.0', { name: 'adapt-contrib-confidenceSlider', version: '<2.1.3' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = getComponents('confidenceSlider');
    return confidenceSliders.length;
  });

  mutateContent('adapt-contrib-confidenceSlider - modify globals ariaRegion attribute', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._components._confidenceSlider.ariaRegion')) {
      _.set(course, '_globals._components._confidenceSlider.ariaRegion', newAriaRegion);
    }
    courseConfidenceSliderGlobals = course._globals._components._confidenceSlider;

    if (courseConfidenceSliderGlobals.ariaRegion === originalAriaRegion) {
      courseConfidenceSliderGlobals.ariaRegion = newAriaRegion;
    }
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - modify globals ariaRegion attribute', async (content) => {
    const isInvalid = courseConfidenceSliderGlobals.ariaRegion === originalAriaRegion;
    if (isInvalid) throw new Error('adapt-contrib-confidenceSlider - globals ariaRegion attribute not modified.');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v2.1.3', { name: 'adapt-contrib-confidenceSlider', version: '2.1.3', framework: '>=2.0.0' });

  testSuccessWhere('non/configured confidenceSlider component with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.1.2' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider' },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('non/configured confidenceSlider component with course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.1.2' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider' },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course', _globals: { _components: { _confidenceSlider: {} } } }
    ]
  });

  testSuccessWhere('non/configured confidenceSlider component with custom course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.1.2' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider' },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course', _globals: { _components: { _confidenceSlider: { ariaRegion: 'custom ariaRegion' } } } }
    ]
  });

  testStopWhere('no confidenceSlider components', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.1.2' }],
    content: [
      { _component: 'other' },
      { _type: 'course' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.1.3' }]
  });
});

describe('adapt-contrib-confidenceSlider - v2.1.3 > v2.2.0', async () => {
  let confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from v2.1.3', { name: 'adapt-contrib-confidenceSlider', version: '<2.2.0' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = getComponents('confidenceSlider');
    return confidenceSliders.length;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._canShowFeedback', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._canShowFeedback = true;
    });
    return true;
  });

  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._canShowMarking', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._canShowMarking = true;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._canShowFeedback atrribute', async () => {
    const isValid = confidenceSliders.every(({ _canShowFeedback }) => _canShowFeedback !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _canShowFeedback not added to every instance of confidenceSlider');
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._canShowMarking atrribute', async () => {
    const isValid = confidenceSliders.every(({ _canShowMarking }) => _canShowMarking !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _canShowMarking not added to every instance of confidenceSlider');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v2.2.0', { name: 'adapt-contrib-confidenceSlider', version: '2.2.0', framework: '>=2.0.17' });

  testSuccessWhere('non/configured confidenceSlider component with empty course', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.1.2' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider' },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('non/configured confidenceSlider component with course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.1.2' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider' },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course', _globals: { _components: { _confidenceSlider: {} } } }
    ]
  });

  testSuccessWhere('non/configured confidenceSlider component with custom course._globals', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.1.2' }],
    content: [
      { _id: 'c-100', _component: 'confidenceSlider' },
      { _id: 'c-105', _component: 'confidenceSlider' },
      { _type: 'course', _globals: { _components: { _confidenceSlider: { ariaRegion: 'custom ariaRegion' } } } }
    ]
  });

  testStopWhere('no confidenceSlider components', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.1.2' }],
    content: [
      { _component: 'other' },
      { _type: 'course' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-contrib-confidenceSlider', version: '2.2.0' }]
  });
});
