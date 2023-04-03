import React, { useRef } from 'react';
import { classes, templates } from 'core/js/reactHelpers';

export default function ConfidenceSlider (props) {
  const {
    _id,
    _globals,
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
    onNumberSelected,
    getIndexFromValue,
    getCorrectAnswers,
    _items,
    _showScale,
    _showNumber,
    _showScaleNumbers,
    _showScaleIndicator,
    _isLinkedModel,
    _isLinkedHigher,
    _linkedModelSelectedIndex
  } = props;

  const confidenceSliderNumberSelectionRef = useRef(0);

  const buttonContainerRef = useRef(null);

  const getCorrectRangeMidpoint = () => {
    const answers = getCorrectAnswers();
    return answers[Math.floor(answers.length / 2)];
  };

  const calculatePercentFromIndex = (index) => {
    return index / (_items.length - 1) * 100;
  };

  const selectedValue = _isCorrectAnswerShown
    ? getCorrectRangeMidpoint()
    : (_selectedItem?.value ?? _scaleStart);
  const selectedIndex = getIndexFromValue(selectedValue);
  const selectedWidth = calculatePercentFromIndex(selectedIndex);

  return (
    <div className="component__inner slider__inner confidenceslider__inner">

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
          <div className="slider__label-start">
            <div className="slider__label-start-inner">
              <span className="aria-label">{_globals._components._confidenceSlider.labelStart} {_scaleStart}</span>
              {labelStart}
            </div>
          </div>
          }

          {labelEnd &&
          <div className="slider__label-end">
            <div className="slider__label-end-inner">
              <span className="aria-label">{_globals._components._confidenceSlider.labelEnd} {_scaleEnd}</span>
              {labelEnd}
            </div>
          </div>
          }

        </div>
        }

        <div className='slider__number-container'>

          {/* annotate the scale */}
          {_showScale && _showScaleNumbers &&
            _items.map(({ index, value }) => {
              return (
                <div
                  key={index}
                  className="slider__number js-slider-number js-slider-number-click"
                  data-id={value}
                  aria-hidden="true"
                  style={{ left: `${calculatePercentFromIndex(index)}%` }}
                  onClick={e => onNumberSelected(parseFloat(e.currentTarget.getAttribute('data-id')))}
                >
                  {value}
                </div>
              );
            })
          }

          {/* annotate the correct answer range */}
          <div className="slider__number-model-range js-slider-model-range">
            {_isCorrectAnswerShown &&
              getCorrectAnswers().map(correctAnswer => {
                return (
                  <div
                    className="slider__number-model-answer"
                    key={correctAnswer}
                    style={{ left: `${calculatePercentFromIndex(getIndexFromValue(correctAnswer))}%` }}
                  >
                    {_showNumber && correctAnswer}
                  </div>
                );
              })
            }
          </div>

          {/* annotate the selected value */}
          <div className="slider__number-answer" />
          {_showScaleIndicator &&
            <div
              className="slider__number-selection js-slider-number-selection a11y-ignore"
              aria-hidden="true"
              style={{ left: `${calculatePercentFromIndex(selectedIndex)}%` }}
              tabIndex="-1"
              ref={confidenceSliderNumberSelectionRef}
            >
              {_showNumber && _selectedItem.value}
            </div>
          }
        </div>

        {/* always present start and end notches */}
        <div className="slider__scale-container js-slider-scale">
          <div className="slider__scale-notch slider__scale-notch-start" />
          {_showScale &&
            <div className="slider__scale-notch-container js-slider-scale-notch-container">
              {_items.slice(1).map((item, index) =>
                <div
                  className="slider__scale-notch"
                  style={{ left: `${calculatePercentFromIndex(index)}%` }}
                  key={item.value}
                >
                </div>
              )}
            </div>
          }
          <div className="slider__scale-notch slider__scale-notch-end" />
        </div>

        <div className={classes([
          'slider__item',
          _shouldShowMarking && _isCorrect && 'is-correct',
          _shouldShowMarking && !_isCorrect && 'is-incorrect'
        ])}
        >
          <div className="slider__item-input-track">
            <div className={`slider__item-input-fill${_isLinkedModel ? _isLinkedHigher ? ' is-higher' : ' is-lower' : ''}`} style={{ width: `${selectedWidth}%` }} />
            {_isLinkedModel &&
            <div className='slider__item-input-fill-linked' style={{ right: `${100 - calculatePercentFromIndex(_linkedModelSelectedIndex)}%` }} />
            }
          </div>

          <input className='slider__item-input js-slider-item-input'
            type='range'
            role='slider'
            value={selectedValue}
            min={_scaleStart}
            max={_scaleEnd}
            aria-valuenow={selectedValue}
            aria-valuemin={_scaleStart}
            aria-valuemax={_scaleEnd}
            data-direction={_marginDir === 'right' ?? 'rtl'}
            disabled={!_isEnabled}
            onChange={e => onNumberSelected(e.target.value)}
          />
        </div>

      </div>

      <div className="btn__container" ref={buttonContainerRef} />

    </div>
  );
};
