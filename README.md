adapt-contrib-confidenceSlider
===============

A two-part component that measures user confidence, using a sliding scale.

##Installation
 
This component can be installed using the  by running the following command:

`adapt install adapt-contrib-confidenceSlider`

This component can also be installed by adding the component to the adapt.json file before running `adapt install`:

`"adapt-contrib-confidenceSlider": "*"` 

##Usage
 
This component can be used as part of an assessment.

##Settings overview
 
A complete example of this components settings can be found in the [example.json](https://github.com/adaptlearning/adapt-contrib-confidenceSlider/blob/master/example.json) file. A description of the core settings can be found at: [Core model attributes](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes)

Further settings for this component are:

####_component

This value must be: `confidenceSlider`

####_classes

You can use this setting to add custom classes to your template and LESS file.

####_layout

This defines the position of the component in the block. Values can be `full`, `left` or `right`. 

####axisLabel

This is the label for the confidence slider axis.

####_scale

The settings within this element define the slider scale.

####labels

Set some label values if you want to tell the user what range the scale represents.

####low

The value of this setting appears at the start of the slider scale.

####high

The value of this setting appears at the end of the slider scale.

####_low

This must be a numeric value for the start of the scale.

####_high

This must be a numeric value for the end of the scale.

####_showNumberValues

Default: `true`

When set to true a numeric value appears above the scale when the slider is moved. The value indicates the sliders position on the scale.

####_snapToNumbers

Default: `true`

When set to true the slider handle will snap to the nearest number on the scale.

####_feedback

This element of the settings contains the feedback for this component.

####feedbackSeparator

To be completed.

####generic

If a value is not entered for `_threshold` this feedback will be shown. Check this is correct.

####_threshold

You can set multiple thresholds for feedback.

####_values

For each threshold range the following values must be set.

####_low

This must be a numeric value for the start of this feedback range.

####_high

This must be a numeric value for the end of this feedback range.

####text

The feedback text for this threshold range.

##Limitations
 
To be completed
 
##Browser spec
 
This component has been tested to the standard Adapt browser specification.