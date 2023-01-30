import Adapt from 'core/js/adapt';
import React from 'react';
import { classes, templates } from 'core/js/reactHelpers';

export default function ConfidenceSlider (props) {
  const {
    _id,
    _shouldShowMarking,
    _isInteractionComplete,
    _isEnabled,
    _isCorrect,
    displayTitle,
    body,
    instruction,
    ariaQuestion,
    labelStart,
    labelEnd,
    _userAnswer,
    _scaleStart,
    _scaleEnd,
    _marginDir
  } = props;

  const _globals = Adapt.course.get('_globals');

  return (
    <div className='component__inner slider__inner confidence__inner'>

      <templates.header {...props} />

      <div
        className={classes([
          'component__widget slider__widget',
          !_isEnabled && 'is-disabled',
          _isInteractionComplete && 'is-complete is-submitted show-user-answer',
          _shouldShowMarking && _isCorrect && 'is-correct',
          _shouldShowMarking && !_isCorrect && 'is-incorrect'
        ])}
        aria-labelledby={ariaQuestion ? null : (displayTitle || body || instruction) && `${_id}-header`}
        aria-label={ariaQuestion || null}
      >

        <div className='slider__label-container js-slider-label-container'>
          {labelStart &&
            <label className='slider__label-start'
              aria-label={_globals._components._confidenceSlider.labelStart}>
              <span className='slider__label-start-inner'>
                {labelStart}
              </span>
            </label>
          }

          {labelEnd &&
            <label className='slider__label-end'
              aria-label={_globals._components._confidenceSlider.labelEnd}>
              <span className='slider__label-end-inner'>
                {labelEnd}
              </span>
            </label>
          }
        </div>

        <div className='slider__number-container'>

          {props._items.map(({ value }, index) =>
            <div className='slider__number js-slider-number js-slider-number-click'
              data-id={value}
              aria-hidden='true'
              key={index}>
              {value}
            </div>
          )}

          <div className='slider__number-model-range js-slider-model-range' />
          <div className='slider__number-answer' />
          <div className='slider__number-selection js-slider-number-selection a11y-ignore'
            aria-hidden='true'
            tabIndex={-1} />
        </div>

        <div className='slider__scale-container js-slider-scale'>
          <div className='slider__scale-notch slider__scale-notch-start' />
          <div className='slider__scale-notch-container js-slider-scale-notch-container' />
          <div className='slider__scale-notch slider__scale-notch-end' />
        </div>

        <div className={classes([
          'slider__item',
          _shouldShowMarking && _isCorrect && 'is-correct',
          _shouldShowMarking && !_isCorrect && 'is-incorrect'
        ])}
        >
          <input className='slider__item-input js-slider-item-input'
            type='range'
            role='slider'
            defaultValue={_userAnswer || _scaleStart}
            min={_scaleStart}
            max={_scaleEnd}
            aria-valuenow={_userAnswer || _scaleStart}
            aria-valuemin={_scaleStart}
            aria-valuemax={_scaleEnd}
            data-rangeslider
            data-direction={_marginDir === 'right' ?? 'rtl'}
            disabled={!_isEnabled}
          />
        </div>

      </div>
      <div className='btn__container' />
    </div>

  );

}
