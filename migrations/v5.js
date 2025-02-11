import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';
import _ from 'lodash';

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

describe('adapt-contrib-confidenceSlider - v5.2.0 > v5.2.3', async () => {
  let confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from v5.2.0', { name: 'adapt-contrib-confidenceSlider', version: '<5.2.3' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = content.filter(({ _component }) => _component === 'confidenceSlider');
    return confidenceSliders.length;
  });

  /**
     * * Add JSON field to component and set blank.
     */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._feedback.title', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._feedback.title = '';
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._feedback.title attribute', async () => {
    const isValid = confidenceSliders.every(({ _feedback }) => _feedback.title === '');
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _feedback.title not added to every instance of confidenceSlider');
    return true;
  });

  /**
     * * Add JSON field to component and set blank.
     */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._feedback.altTitle', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._feedback.altTitle = '';
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._feedback.altTitle attribute', async () => {
    const isValid = confidenceSliders.every(({ _feedback }) => _feedback.altTitle === '');
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _feedback.altTitle not added to every instance of confidenceSlider');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v5.2.3', { name: 'adapt-contrib-confidenceSlider', version: '5.2.3', framework: '>=5.19.1' });
});

describe('adapt-contrib-confidenceSlider - v5.2.3 > v5.2.4', async () => {
  let confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from v5.2.3', { name: 'adapt-contrib-confidenceSlider', version: '<5.2.4' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = content.filter(({ _component }) => _component === 'confidenceSlider');
    return confidenceSliders.length;
  });

  /**
   * * Add JSON field to component and set blank.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider.ariaQuestion', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider.ariaQuestion = '';
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider.ariaQuestion attribute', async () => {
    const isValid = confidenceSliders.every(({ ariaQuestion }) => ariaQuestion === '');
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - ariaQuestion not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set blank.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._feedback.altTitle', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._feedback.altTitle = '';
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._feedback.altTitle atrribute', async () => {
    const isValid = confidenceSliders.every(({ _feedback }) => _feedback.altTitle === '');
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _feedback.altTitle not added to every instance of confidenceSlider');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v5.2.4', { name: 'adapt-contrib-confidenceSlider', version: '5.2.4', framework: '>=5.19.1' });
});

describe('adapt-contrib-confidenceSlider - v5.2.4 > v5.4.4', async () => {
  let course, courseConfidenceSliderGlobals, confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from v5.2.4', { name: 'adapt-contrib-confidenceSlider', version: '<5.4.4' });

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

    courseConfidenceSliderGlobals.labelStart = 'Start of the scale';

    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - modify globals labelStart attribute', async (content) => {
    const isValid = courseConfidenceSliderGlobals.labelStart === 'Start of the scale';
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - globals labelStart attribute not modified.');
    return true;
  });

  /**
    * * Add an attribute value within course globals.
    */
  mutateContent('adapt-contrib-confidenceSlider - modify globals labelEnd attribute', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
    if (!_.has(course, '_globals._components._confidenceSlider')) _.set(course, '_globals._components._confidenceSlider', {});
    courseConfidenceSliderGlobals = course._globals._components._confidenceSlider;

    courseConfidenceSliderGlobals.labelStart = 'End of the scale';

    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - modify globals labelEnd attribute', async (content) => {
    const isValid = courseConfidenceSliderGlobals.labelStart === 'End of the scale';
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - globals labelEnd attribute not modified.');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v5.4.4', { name: 'adapt-contrib-confidenceSlider', version: '5.4.4', framework: '>=5.19.1' });
});

describe('adapt-contrib-confidenceSlider - v5.4.4 > v5.4.6', async () => {
  let confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from v5.4.4', { name: 'adapt-contrib-confidenceSlider', version: '<5.4.6' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = content.filter(({ _component }) => _component === 'confidenceSlider');
    return confidenceSliders.length;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
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
});

describe('adapt-contrib-confidenceSlider - v5.4.6 > v5.5.2', async () => {
  let confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from v5.4.6', { name: 'adapt-contrib-confidenceSlider', version: '<5.5.2' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = content.filter(({ _component }) => _component === 'confidenceSlider');
    return confidenceSliders.length;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._scaleEnd', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      if (confidenceSlider._scaleEnd === 1) {
        confidenceSlider._scaleEnd = 10;
      }
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._scaleEnd attribute', async () => {
    const isValid = confidenceSliders.every(({ _scaleEnd }) => _scaleEnd !== null);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _scaleEnd not added to every instance of confidenceSlider');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v5.5.2', { name: 'adapt-contrib-confidenceSlider', version: '5.5.2', framework: '>=5.19.1' });
});
