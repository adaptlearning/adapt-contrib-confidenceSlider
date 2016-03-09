# adapt-contrib-confidenceSlider

A two-part component that measures user confidence, using a sliding scale.

[Visit the **ConfidenceSlider** wiki](https://github.com/adaptlearning/adapt-contrib-confidenceSlider/wiki) for more information about its functionality and for explanations of key properties.

## Installation

* If **ConfidenceSlider** has been uninstalled from the Adapt framework, it may be reinstalled.
With the [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run the following from the command line:
`adapt install adapt-contrib-confidenceSlider`

    Alternatively, this component can also be installed by adding the following line of code to the *adapt.json* file:  
    `"adapt-contrib-confidenceSlider": "*"`  
    Then running the command:  
    `adapt install`  
    (This second method will reinstall all plug-ins listed in *adapt.json*.)  

* If **ConfidenceSlider** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).  
<div float align=right><a href="#top">Back to Top</a></div>

## Usage

This component can be used as part of an assessment.

## Settings overview

A complete example of this components settings can be found in the [example.json](https://github.com/adaptlearning/adapt-contrib-confidenceSlider/blob/master/example.json) file. A description of the core settings can be found at: [Core model attributes](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes)

### Attributes

Further settings for this component are:

**_component** (string): This value must be: `confidenceSlider`

**_classes** (string): CSS class name to be applied to **ConfidenceSlider**’s containing `div`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

**_layout** (string): This defines the horizontal position of the component in the block. Acceptable values are `full`, `left` or `right`.

**axisLabel** (string): This is the label for the confidence slider axis.

**_scale** (object): The settings within this element define the slider scale.

>**labels** (object): Set some label values if you want to tell the user what range the scale represents.

>>**low** (string): The value of this setting appears at the start of the slider scale.

>>**high** (string): The value of this setting appears at the end of the slider scale.

>**_low** (number): This must be a numeric value for the start of the scale.

>**_high** (number): This must be a numeric value for the end of the scale.

>**_showNumberValues** (boolean): When set to true a numeric value appears above the scale when the slider is moved. The value indicates the sliders position on the scale.

>**_snapToNumbers** (boolean): When set to true the slider handle will snap to the nearest number on the scale.

**_feedback** (object): This element of the settings contains the feedback for this component.

>**feedbackSeparator** (string): To be completed.

>**generic** (string): If a value is not entered for `_threshold` this feedback will be shown. Check this is correct.

>**_threshold** (object): You can set multiple thresholds for feedback.

>>**_values** (object): For each threshold range the following values must be set.

>>>**_low** (number): This must be a numeric value for the start of this feedback range.

>>>**_high** (number): This must be a numeric value for the end of this feedback range.

>>>**text** (string): The feedback text for this threshold range.

### Accessibility
**ConfidenceSlider** has been assigned a label using the [aria-label](https://github.com/adaptlearning/adapt_framework/wiki/Aria-Labels) attribute: **ariaRegion**. This label is not a visible element. It is utilized by assistive technology such as screen readers. Should the region's text need to be customised, it can be found within the **globals** object in [*properties.schema*](https://github.com/adaptlearning/adapt-contrib-confidenceSlider/blob/master/properties.schema).
<div float align=right><a href="#top">Back to Top</a></div>

## Limitations

No known limitations.

----------------------------
**Version number:**  2.0   <a href="https://community.adaptlearning.org/" target="_blank"><img src="https://github.com/adaptlearning/documentation/blob/master/04_wiki_assets/plug-ins/images/adapt-logo-mrgn-lft.jpg" alt="adapt learning logo" align="right"></a>
**Framework versions:** 2.0
**Author / maintainer:** Adapt Core Team with [contributors](https://github.com/adaptlearning/adapt-contrib-confidenceSlider/graphs/contributors)
**Accessibility support:** WAI AA
**RTL support:** yes
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), IE 11, IE10, IE9, IE8, IE Mobile 11, Safari for iPhone (iOS 7+8), Safari for iPad (iOS 7+8), Safari 8, Opera
