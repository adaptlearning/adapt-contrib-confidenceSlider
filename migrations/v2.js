import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-contrib-confidenceSlider - v2.0.0 > v2.1.0', async () => {
  let confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from v2', { name: 'adapt-contrib-confidenceSlider', version: '<2.1.0' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = content.filter(({ _component }) => _component === 'confidenceSlider');
    return confidenceSliders.length;
  });

  /**
   * * Remove a JSON field
   */
  mutateContent('adapt-contrib-confidenceSlider - remove confidenceSlider.axisLabel attribute', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      delete confidenceSlider.axisLabel;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider.axisLabel attribute', async () => {
    const isValid = confidenceSliders.every(({ axisLabel }) => axisLabel === undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - axisLabel not removed from confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set blank.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider.disabledBody', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider.disabledBody = '';
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider.disabledBody atrribute', async () => {
    const isValid = confidenceSliders.every(({ disabledBody }) => disabledBody !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - disabledBody not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Remove a JSON field
   */
  mutateContent('adapt-contrib-confidenceSlider - remove confidenceSlider._scale attribute', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      delete confidenceSlider._scale;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._scale attribute', async () => {
    const isValid = confidenceSliders.every(({ _scale }) => _scale === undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _scale not removed from confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._attempts', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._attempts = 1;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._attempts atrribute', async () => {
    const isValid = confidenceSliders.every(({ _attempts }) => _attempts === 1);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _recordInteraction not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._shouldDisplayAttempts', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._shouldDisplayAttempts = false;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._shouldDisplayAttempts atrribute', async () => {
    const isValid = confidenceSliders.every(({ _shouldDisplayAttempts }) => _shouldDisplayAttempts === false);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _shouldDisplayAttempts not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._questionWeight', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._questionWeight = 1;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._questionWeight atrribute', async () => {
    const isValid = confidenceSliders.every(({ _questionWeight }) => _questionWeight === 1);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _questionWeight not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._recordInteraction', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._recordInteraction = true;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._recordInteraction atrribute', async () => {
    const isValid = confidenceSliders.every(({ _recordInteraction }) => _recordInteraction === true);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _attempts not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set blank.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._linkedToId', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._linkedToId = '';
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._linkedToId atrribute', async () => {
    const isValid = confidenceSliders.every(({ _linkedToId }) => _linkedToId !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _linkedToId not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set blank.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider.labelStart', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider.labelStart = '';
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider.labelStart atrribute', async () => {
    const isValid = confidenceSliders.every(({ labelStart }) => labelStart !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - labelStart not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider.labelEnd', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider.labelEnd = '';
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider.labelEnd atrribute', async () => {
    const isValid = confidenceSliders.every(({ labelEnd }) => labelEnd !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - labelEnd not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._scaleStart', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._scaleStart = 1;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._scaleStart atrribute', async () => {
    const isValid = confidenceSliders.every(({ _scaleStart }) => _scaleStart === 1);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _scaleStart not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._scaleEnd', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._scaleEnd = 1;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._scaleEnd atrribute', async () => {
    const isValid = confidenceSliders.every(({ _scaleEnd }) => _scaleEnd === 1);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _scaleEnd not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._scaleStep', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._scaleStep = 1;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._scaleStep atrribute', async () => {
    const isValid = confidenceSliders.every(({ _scaleStep }) => _scaleStep === 1);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _scaleStep not added to every instance of confidenceSlider');
    return true;
  });

  /**
  * * Add JSON field to component and set blank.
  */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._correctAnswer', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._correctAnswer = '';
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._correctAnswer atrribute', async () => {
    const isValid = confidenceSliders.every(({ _correctAnswer }) => _correctAnswer !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _correctAnswer not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Remove a JSON field
   */
  mutateContent('adapt-contrib-confidenceSlider - remove confidenceSlider._correctRange._high attribute', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      delete confidenceSlider._correctRange._high;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._correctRange._high attribute', async () => {
    const isValid = confidenceSliders.some(({ _correctRange }) => _correctRange._high);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _correctRange._high not removed from confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._correctRange._bottom', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._correctRange._bottom = 0;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._correctRange._bottom atrribute', async () => {
    const isValid = confidenceSliders.every(({ _correctRange }) => _correctRange._bottom === 0);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _correctRange._bottom not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Remove a JSON field
   */
  mutateContent('adapt-contrib-confidenceSlider - remove confidenceSlider._correctRange._low attribute', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      delete confidenceSlider._correctRange._low;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._correctRange._low attribute', async () => {
    const isValid = confidenceSliders.some(({ _correctRange }) => _correctRange._low);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _correctRange._low not removed from confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._correctRange._top', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._correctRange._top = 0;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._correctRange._top atrribute', async () => {
    const isValid = confidenceSliders.every(({ _correctRange }) => _correctRange._top === 0);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _correctRange._top not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Remove a JSON field
   */
  mutateContent('adapt-contrib-confidenceSlider - remove confidenceSlider._correctRange._showNumberValues attribute', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      delete confidenceSlider._correctRange._showNumberValues;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._correctRange._showNumberValues attribute', async () => {
    const isValid = confidenceSliders.some(({ _correctRange }) => _correctRange._showNumberValues);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _correctRange._showNumberValues not removed from confidenceSlider');
    return true;
  });

  /**
   * * Remove a JSON field
   */
  mutateContent('adapt-contrib-confidenceSlider - remove confidenceSlider._correctRange._snapToNumbers attribute', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      delete confidenceSlider._correctRange._snapToNumbers;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._correctRange._snapToNumbers attribute', async () => {
    const isValid = confidenceSliders.some(({ _correctRange }) => _correctRange._snapToNumbers);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _correctRange._snapToNumbers not removed from confidenceSlider');
    return true;
  });

  /**
   * * Remove a JSON field
   */
  mutateContent('adapt-contrib-confidenceSlider - remove confidenceSlider._correctRange.labels.high attribute', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      delete confidenceSlider._correctRange.labels.high;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._correctRange.labels.high attribute', async () => {
    const isValid = confidenceSliders.some(({ _correctRange }) => _correctRange.labels.high);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _correctRange.labels.high not removed from confidenceSlider');
    return true;
  });

  /**
   * * Remove a JSON field
   */
  mutateContent('adapt-contrib-confidenceSlider - remove confidenceSlider._correctRange.labels.low attribute', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      delete confidenceSlider._correctRange.labels.low;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._correctRange.labels.low attribute', async () => {
    const isValid = confidenceSliders.some(({ _correctRange }) => _correctRange.labels.low);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _correctRange.labels.low not removed from confidenceSlider');
    return true;
  });

  /**
   * ? Does this erase all of the items within the object as well?
   */
  mutateContent('adapt-contrib-confidenceSlider - remove confidenceSlider._feedback attribute', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      delete confidenceSlider._feedback;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._feedback attribute', async () => {
    const isValid = confidenceSliders.some(({ _feedback }) => _feedback);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _feedback not removed from confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._showNumber', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._showNumber = true;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._showNumber atrribute', async () => {
    const isValid = confidenceSliders.every(({ _showNumber }) => _showNumber === true);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _showNumber not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._showScaleIndicator', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._showScaleIndicator = true;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._showScaleIndicator atrribute', async () => {
    const isValid = confidenceSliders.every(({ _showScaleIndicator }) => _showScaleIndicator === true);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _showScaleIndicator not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._showScale', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._showScale = true;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._showScale atrribute', async () => {
    const isValid = confidenceSliders.every(({ _showScale }) => _showScale === true);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _showScale not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._showScale', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._showScale = true;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._showScale atrribute', async () => {
    const isValid = confidenceSliders.every(({ _showScale }) => _showScale === true);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _showScale not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set blank.
   * ? Will this add back in the _feedback object that was removed on line 373?
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._feedback.feedbackSeparator', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._feedback.feedbackSeparator = '';
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._feedback.feedbackSeparator atrribute', async () => {
    const isValid = confidenceSliders.some(({ _feedback }) => _feedback.feedbackSeparator !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _feedback.feedbackSeparator not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set blank.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._feedback.generic', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._feedback.generic = '';
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._feedback.generic atrribute', async () => {
    const isValid = confidenceSliders.every(({ _feedback }) => _feedback.generic !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _feedback.generic not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set blank.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._comparison.lower', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._comparison.lower = '';
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._comparison.lower atrribute', async () => {
    const isValid = confidenceSliders.every(({ _comparison }) => _comparison.lower !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _comparison.lower not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set blank.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._comparison.same', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._comparison.same = '';
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._comparison.same atrribute', async () => {
    const isValid = confidenceSliders.some(({ _comparison }) => _comparison.same !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _comparison.same not added to any instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set blank.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._comparison.higher', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._comparison.higher = '';
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._comparison.higher atrribute', async () => {
    const isValid = confidenceSliders.some(({ _comparison }) => _comparison.higher !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _comparison.higher not added to any instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._threshold.items._values._low', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._threshold.items._values._low = 0;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._threshold.items._values._low atrribute', async () => {
    const isValid = confidenceSliders.some(({ _threshold }) => _threshold.items._values._low === 0);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _threshold.items._values._low not added to any instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._threshold.items._values._high', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._threshold.items._values._high = 0;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._threshold.items._values._high atrribute', async () => {
    const isValid = confidenceSliders.some(({ _threshold }) => _threshold.items._values._high === 0);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _threshold.items._values._high not added to any instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set blank.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._threshold.items.text', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._threshold.items.text = '';
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._threshold.items.text atrribute', async () => {
    const isValid = confidenceSliders.some(({ _threshold }) => _threshold.items.text !== undefined);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _threshold.items.text not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._shouldStoreResponses', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._shouldStoreResponses = false;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._shouldStoreResponses atrribute', async () => {
    const isValid = confidenceSliders.some(({ _shouldStoreResponses }) => _shouldStoreResponses === false);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _shouldStoreResponses not added to every instance of confidenceSlider');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v2.1.0', { name: 'adapt-contrib-confidenceSlider', version: '2.1.0', framework: '2.0.0' });
});

describe('adapt-contrib-confidenceSlider - v2.1.0 > v2.1.3', async () => {
  let course, courseConfidenceSliderGlobals, confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from v2.1.0', { name: 'adapt-contrib-confidenceSlider', version: '<2.1.3' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = content.filter(({ _component }) => _component === 'confidenceSlider');
    return confidenceSliders.length;
  });

  /**
    * * Adjust an attribute value within course globals.
    */
  mutateContent('adapt-contrib-confidenceSlider - modify globals ariaRegion attribute', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
    if (!_.has(course, '_globals._components._confidenceSlider')) _.set(course, '_globals._components._confidenceSlider', {});
    courseConfidenceSliderGlobals = course._globals._components._confidenceSlider;

    if (courseConfidenceSliderGlobals) {
      if (courseConfidenceSliderGlobals.ariaRegion ===
          'This component requires you to answer the question by selecting the relevant value. After selecting a value select the submit button below.') {
        courseConfidenceSliderGlobals.ariaRegion = 'Answer the question by selecting a value from the range. Once you have done so, select the submit button below.';
      }
    }
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - modify globals ariaRegion attribute', async (content) => {
    const isValid = courseConfidenceSliderGlobals.ariaRegion === 'Answer the question by selecting a value from the range. Once you have done so, select the submit button below.';
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - globals ariaRegion attribute not modified.');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v2.1.3', { name: 'adapt-contrib-confidenceSlider', version: '2.1.3', framework: '>=2.0.0' });
});

describe('adapt-contrib-confidenceSlider - v2.1.3 > v2.2.0', async () => {
  let confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from v2.1.3', { name: 'adapt-contrib-confidenceSlider', version: '<2.2.0' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = content.filter(({ _component }) => _component === 'confidenceSlider');
    return confidenceSliders.length;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._canShowFeedback', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._canShowFeedback = true;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._canShowFeedback atrribute', async () => {
    const isValid = confidenceSliders.some(({ _canShowFeedback }) => _canShowFeedback === true);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _canShowFeedback not added to every instance of confidenceSlider');
    return true;
  });

  /**
   * * Add JSON field to component and set attribute.
   */
  mutateContent('adapt-contrib-confidenceSlider - add confidenceSlider._canShowMarking', async () => {
    confidenceSliders.forEach(confidenceSlider => {
      confidenceSlider._canShowMarking = true;
    });
    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - check confidenceSlider._canShowMarking atrribute', async () => {
    const isValid = confidenceSliders.some(({ _canShowMarking }) => _canShowMarking === true);
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - _canShowMarking not added to every instance of confidenceSlider');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v2.2.0', { name: 'adapt-contrib-confidenceSlider', version: '2.2.0', framework: '>=2.0.17' });
});
