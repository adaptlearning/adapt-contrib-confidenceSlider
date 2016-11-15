# adapt-contrib-confidenceSlider  

<img src="" alt="Confidence Slider in action" align="right"> **Confidence Slider** is a *reflective question component* bundled with the [Adapt framework](https://github.com/adaptlearning/adapt_framework).  

To respond to the question, the learner positions a slider along a scale. Upon submission, feedback is provided via the [**Tutor** extension](https://github.com/adaptlearning/adapt-contrib-tutor), if installed. A second confidence slider can be created and linked to this one. This allows learners to compare his/her confidence to a previous measurement. Feedback may be coordinated according to the selected slider position. In addition, the linked slider may contain comparative feedback. The number of attempts allowed may be configured for a confidence slider. When a pair of confidence sliders are linked the first must be set to allow only one attempt. The second confidence slider, linking to the first (via **_linkedToId**), can have either single or unlimited attempts set. Set the number of attempts to zero or less to indicate unlimited.

[Visit the **Confidence Slider** wiki](https://github.com/adaptlearning/adapt-contrib-confidenceSlider/wiki) for more information about its functionality and for explanations of key properties. 

##Installation

As one of Adapt's *[core components](https://github.com/adaptlearning/adapt_framework/wiki/Core-Plug-ins-in-the-Adapt-Learning-Framework#components),* **Confidence Slider** is included with the [installation of the Adapt framework](https://github.com/adaptlearning/adapt_framework/wiki/Manual-installation-of-the-Adapt-framework#installation) and the [installation of the Adapt authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki/Installing-Adapt-Origin).

* If **Confidence Slider** has been uninstalled from the Adapt framework, it may be reinstalled.
With the [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run the following from the command line:  
`adapt install adapt-contrib-confidenceSlider`

    Alternatively, this component can also be installed by adding the following line of code to the *adapt.json* file:  
    `"adapt-contrib-confidenceSlider": "*"`  
    Then running the command:  
    `adapt install`  
    (This second method will reinstall all plug-ins listed in *adapt.json*.)  

* If **Confidence Slider** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).  

<div float align=right><a href="#top">Back to Top</a></div>

## Settings Overview

The attributes listed below are used in *components.json* to configure **Confidence Slider**, and are properly formatted as JSON in [*example.json*](https://github.com/adaptlearning/adapt-contrib-confidenceSlider/blob/master/example.json). Visit the [**Confidence Slider** wiki](https://github.com/adaptlearning/adapt-contrib-confidenceSlider/wiki) for more information about how they appear in the [authoring tool](https://github.com/adaptlearning/adapt_authoring/wiki). 

### Attributes

In addition to the attributes specifically listed below, [*question components*](https://github.com/adaptlearning/adapt_framework/wiki/Core-Plug-ins-in-the-Adapt-Learning-Framework#question-components) can implement the following sets of attributes:   
+ [**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. They have no default values. Like the attributes below, their values are assigned in *components.json*. 
+ [**core buttons**](https://github.com/adaptlearning/adapt_framework/wiki/Core-Buttons): Default values are found in *course.json*, but may be overridden by **Confidence Slider's** model in *components.json*.

**_component** (string): This value must be: `confidenceSlider`.  

**_classes** (string): CSS class name to be applied to **Confidence Slider**’s containing `div`. The class must be predefined in one of the Less files. Separate multiple classes with a space.  

**_layout** (string): This defines the horizontal position of the component in the block. Acceptable values are `full`, `left` or `right`.  

**disabledBody** (string): This optional text appears in place of the **body** text when the confidence slider to which this one is linked has not been answered.

**instruction** (string): This optional text appears above the component. It is frequently used to
guide the learner’s interaction with the component.  
  
**_recordInteraction** (boolean) Determines whether or not the learner's answers will be recorded to the LMS via cmi.interactions. Default is `true`. For further information, see the entry for `_shouldRecordInteractions` in the README for [adapt-contrib-spoor](https://github.com/adaptlearning/adapt-contrib-spoor).

**_linkedToId** (string): The component ID of a slider to which this slider can be linked. This is optional and if set, will disable user interaction until a selection is submitted on the linked slider.

**labelStart** (string): Text/characters that appear at the start of the slider scale.    

**labelEnd** (string): Text/characters that appear at the end of the slider scale.   

**_scaleStart** (number): This value is the numeric start of the scale. It is used to calculate the slider's position on the scale.  

**_scaleEnd** (number): This value is the numeric end of the scale. It is used to calculate the slider's position on the scale.  

**_showNumber** (boolean): When set to `true`, a numeric value appears on the marker described in **_showScaleIndicator**. The value indicates the slider's position on the scale. The default is `true`. Note that **_showScaleIndicator** must be set to `true` in order for this to work.  

**_showScaleIndicator** (boolean): When set to `true`, a marker for the position of the slider along the scale is shown. If **_showNumber** is `true` this marker will contain a numeric value. If **_showNumber** is `false` a blank marker is shown.  

**_showScale** (boolean): When set to `false`, visual indications of the scale&mdash;range of numbers and short rules&mdash;are not displayed. The default is `true`.

**_feedback** (object): If the [**Tutor** extension](https://github.com/adaptlearning/adapt-contrib-tutor) is enabled, these various texts will be displayed depending on the submitted answer. **_feedback** contains values for three seperate elements: generic, comparison and threshold feedback. Generic feedback is always presented to the user. Comparison feedback is presented on submission if the slider has been linked to another slider. Threshold feedback is determined according to the range in which the user's selection falls. All feedback elements are optional. Each element can be separated by one or more characters (such as a space) or, more commonly, by some HTML markup.

>**feedbackSeparator** (string): Optional text/markup that will separate each feedback element.

>**generic** (string): Text that will be shown whichever selection is made.

>**_comparison** (object): Text that will be shown on submission if the slider has been linked to another slider.

>>**lower** (string): This text will be shown if the user has selected a lower value than was chosen on the linked slider.

>>**higher** (string): This text will be shown if the user has selected a higher value than was chosen on the linked slider.

>>**same** (string): This text will be shown if both values are the same.

>**_threshold** (object array): Multiple items may be created. Each item represents the feedback for a range of slider values.

>>**_values** (object): Specifies the range of slider values for which the associated **text** will be included in the feedback.

>>>**_low** (number): The lower bound of the range (inclusive).

>>>**_high** (number): The upper bound of the range (inclusive).

>>**text** (string): The text that will be included in the feedback if the user's selection falls with the range specified by **_values**.

**_shouldStoreResponses** (boolean): Optional. When set to `true`, the user's response will be saved so that it can be restored in subsequent sessions. This functionality requires that the Spoor extension be installed. If **_spoor._tracking._shouldStoreResponses** (see *config.json*) is set to `true`, the value specified here is ignored, therefore this attribute only needs to be set if you want to track the user's responses to a particular Confidence Slider component without also tracking all other user responses.

### Accessibility
**Confidence Slider** has been assigned a label using the [aria-label](https://github.com/adaptlearning/adapt_framework/wiki/Aria-Labels) attribute: **ariaRegion**. This label is not a visible element. It is utilized by assistive technology such as screen readers. Should the region's text need to be customised, it can be found within the **globals** object in [*properties.schema*](https://github.com/adaptlearning/adapt-contrib-confidenceSlider/blob/master/properties.schema).   
<div float align=right><a href="#top">Back to Top</a></div>

## Limitations
 
No known limitations.  

----------------------------
**Version number:**  2.1.1   <a href="https://community.adaptlearning.org/" target="_blank"><img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/adapt-logo-mrgn-lft.jpg" alt="adapt learning logo" align="right"></a> 
**Framework versions:** 2.0.0
**Author / maintainer:** Adapt Core Team with [contributors](https://github.com/adaptlearning/adapt-contrib-confidenceSlider/graphs/contributors)    
**Accessibility support:** WAI AA   
**RTL support:** yes  
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge 12, IE 11, IE10, IE9, IE8, IE Mobile 11, Safari for iPhone (iOS 8+9), Safari for iPad (iOS 8+9), Safari 8, Opera    
