import React, { useEffect, useRef, useState } from 'react';
import Adapt from 'core/js/adapt';
import { classes, templates } from 'core/js/reactHelpers';

export default function ConfidenceSlider (props) {
  const {
    _globals,
    _isReady,
    _id,
    _shouldShowMarking,
    _isInteractionComplete,
    _isCorrectAnswerShown,
    _isEnabled,
    _isCorrect,
    displayTitle,
    body,
    instruction,
    ariaQuestion,
    labelStart,
    labelEnd,
    _selectedItem,
    _scaleStart,
    _scaleEnd,
    _marginDir,
    onInput,
    onNumberSelected,
    mapValue,
    getIndexFromValue,
    normalise,
    getCorrectAnswers,
    _items,
    _showScale,
    _showNumber,
    _showScaleNumbers,
    _showScaleIndicator
  } = props;

  const sliderScaleRef = useRef(null);
  const sliderNumberSelectionRef = useRef(null);
  const buttonContainerRef = useRef(null);
  const [sliderScaleWidth, setSliderScaleWidth] = useState(0);

  const mapIndexToPixels = (value) => {
    const numberOfGrads = _items.length;

    return Math.round(mapValue(value, 0, numberOfGrads - 1, 0, sliderScaleWidth));
  };

  const getCorrectRangeMidpoint = () => {
    const answers = getCorrectAnswers();
    return answers[Math.floor(answers.length / 2)];
  };

  useEffect(() => {
    const onResize = () => {
      setSliderScaleWidth($(sliderScaleRef.current).width());
    };

    Adapt.on('device:resize', onResize);

    onResize();

    return () => Adapt.off('device:resize', onResize);
  }, [Adapt, _isReady]);

  useEffect(() => {
    const value = _isCorrectAnswerShown ? getCorrectRangeMidpoint() : (_selectedItem.value || _scaleStart);
    const itemIndex = getIndexFromValue(value);
    const pixels = mapIndexToPixels(itemIndex);

    $(sliderNumberSelectionRef.current)
      .velocity('stop')
      .velocity({
        left: pixels
      }, {
        duration: 200,
        easing: 'linear',
        mobileHA: false
      });
  }, [_isCorrectAnswerShown, _selectedItem]);

  return (
    <div className="component__inner slider__inner confidence__inner">

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

        {(labelStart || labelEnd) &&
        <div className="slider__label-container js-slider-label-container">

          {labelStart &&
          <div className="slider__label-start" aria-label={_globals._components._confidenceSlider.labelStart}>
            <div className="slider__label-start-inner">
              {labelStart}
            </div>
          </div>
          }

          {labelEnd &&
          <div className="slider__label-end" aria-label={_globals._components._confidenceSlider.labelEnd}>
            <div className="slider__label-end-inner">
              {labelEnd}
            </div>
          </div>
          }

        </div>
        }

        <div className='slider__number-container'>

          {/* annotate the scale */}
          {_showScale && _showScaleNumbers &&
            _items.map(({ value }, index) => {
              const normalisedPosition = normalise(index, 0, _items.length - 1);
              return (
                <div
                  key={value}
                  className="slider__number js-slider-number js-slider-number-click"
                  data-id={value}
                  aria-hidden="true"
                  style={{ left: Math.round(normalisedPosition * sliderScaleWidth) }}
                  onClick={onNumberSelected}
                >
                  {value}
                </div>
              );
            })
          }

          {/* annotate the correct answer range  */}
          <div className="slider__number-model-range js-slider-model-range">
            {_isCorrectAnswerShown &&
              getCorrectAnswers().map(correctAnswer => {
                return (
                  <div
                    className="slider__number-model-answer"
                    key={correctAnswer}
                    style={{ left: `${mapIndexToPixels(getIndexFromValue(correctAnswer))}px` }}
                  >
                    {_showNumber && correctAnswer}
                  </div>
                );
              })
            }
          </div>

          {/* annotate the selected value  */}
          <div className="slider__number-answer"></div>
          {_showScaleIndicator &&
            <div
              className="slider__number-selection js-slider-number-selection a11y-ignore"
              aria-hidden="true"
              tabIndex="-1"
              ref={sliderNumberSelectionRef}
            >
              {_showNumber && _selectedItem.value}
            </div>
          }
        </div>

        {/* always present start and end notches */}
        <div className="slider__scale-container js-slider-scale" ref={sliderScaleRef}>
          <div className="slider__scale-notch slider__scale-notch-start"></div>
          {_showScale &&
              <div className="slider__scale-notch-container js-slider-scale-notch-container">
                {_items.slice(1).map((item, index) =>
                  <div
                    className="slider__scale-notch"
                    style={{ left: `${mapIndexToPixels(index + 1)}px` }}
                    key={item.value}
                  >
                  </div>
                )}
              </div>
          }
          <div className="slider__scale-notch slider__scale-notch-end"></div>
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
            value={_isCorrectAnswerShown ? getCorrectRangeMidpoint() : (_selectedItem.value || _scaleStart)}
            min={_scaleStart}
            max={_scaleEnd}
            aria-valuenow={_isCorrectAnswerShown ? getCorrectRangeMidpoint() : (_selectedItem.value || _scaleStart)}
            aria-valuemin={_scaleStart}
            aria-valuemax={_scaleEnd}
            data-direction={_marginDir === 'right' ?? 'rtl'}
            disabled={!_isEnabled}
            onInput={onInput}
          />
        </div>

      </div>

      <div className="btn__container" ref={buttonContainerRef}></div>

    </div>
  );
};
