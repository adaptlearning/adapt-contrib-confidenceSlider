import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin } from 'adapt-migrations';
import _ from 'lodash';

describe('adapt-contrib-confidenceSlider - v2.2.0 > v4.0.0', async () => {
  let course, courseConfidenceSliderGlobals, confidenceSliders;

  whereFromPlugin('adapt-contrib-confidenceSlider - from v2.2.0', { name: 'adapt-contrib-confidenceSlider', version: '<4.0.0' });

  whereContent('adapt-contrib-confidenceSlider - where confidenceSlider', async content => {
    confidenceSliders = content.filter(({ _component }) => _component === 'confidenceSlider');
    return confidenceSliders.length;
  });

  /**
   * Add an attribute value within course globals.
   */
  mutateContent('adapt-contrib-confidenceSlider - modify globals labelStart attribute', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
    if (!_.has(course, '_globals._components._confidenceSlider')) _.set(course, '_globals._components._confidenceSlider', {});
    courseConfidenceSliderGlobals = course._globals._components._confidenceSlider;

    courseConfidenceSliderGlobals.labelStart = 1;

    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - modify globals labelStart attribute', async (content) => {
    const isValid = courseConfidenceSliderGlobals.labelStart === 1;
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - globals labelStart attribute not added.');
    return true;
  });

  /**
    * * Add an attribute value within course globals.
    */
  mutateContent('adapt-contrib-confidenceSlider - modify globals labelEnd attribute', async (content) => {
    course = content.find(({ _type }) => _type === 'course');
    if (!_.has(course, '_globals._components._confidenceSlider')) _.set(course, '_globals._components._confidenceSlider', {});
    courseConfidenceSliderGlobals = course._globals._components._confidenceSlider;

    courseConfidenceSliderGlobals.labelEnd = 1;

    return true;
  });

  checkContent('adapt-contrib-confidenceSlider - modify globals labelEnd attribute', async (content) => {
    const isValid = courseConfidenceSliderGlobals.labelEnd === 1;
    if (!isValid) throw new Error('adapt-contrib-confidenceSlider - globals labelEnd attribute not added.');
    return true;
  });

  updatePlugin('adapt-contrib-confidenceSlider - update to v4.0.0', { name: 'adapt-contrib-confidenceSlider', version: '4.0.0', framework: '>=5.18.3' });
});
