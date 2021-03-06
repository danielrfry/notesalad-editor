import React, { useCallback } from 'react';
import Centre from '../Centre/Centre';
import useDrag from '../../hooks/drag';
import classNames from 'classnames';
import { useGroupEnabledState } from '../UIGroupEnabledContext/UIGroupEnabledContext';

import './Knob.css';

const ANGLE_START = -135;
const ANGLE_END = 135;
const DRAG_DISTANCE = 200;
const FINE_DRAG_DISTANCE = 50;

const rads = Math.PI / 180;

const Arc = props => {
    const { cx, cy, radius, start, end, ...others } = props;
    const x1 = cx + Math.sin(start * rads) * radius;
    const y1 = cy - Math.cos(start * rads) * radius;
    const x2 = cx + Math.sin(end * rads) * radius;
    const y2 = cy - Math.cos(end * rads) * radius;
    const large = end - start > 180 ? 1 : 0;
    return (
        <path
            d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2}`}
            {...others}
        ></path>
    );
};

const getHeight = size => {
    const hs = size / 2;
    const y1 = hs - Math.cos(ANGLE_START * rads) * hs;
    const y2 = hs - Math.cos(ANGLE_END * rads) * hs;
    return Math.max(y1, y2);
};

const getFineDragValue = (dY, min, max) => {
    const sign = dY < 0 ? -1 : 1;
    const fineAdjust = Math.abs(dY);

    const range = max - min;
    const coarseDY = Math.max(0, Math.abs(dY) - FINE_DRAG_DISTANCE);
    const maxCoarseDY = DRAG_DISTANCE - FINE_DRAG_DISTANCE;
    const coarseAdjust = Math.pow(coarseDY / maxCoarseDY, 2) * range;

    return sign * Math.max(fineAdjust, coarseAdjust);
};

const getLinearDragValue = (dY, min, max) => {
    return (dY / DRAG_DISTANCE) * (max - min);
};

const Knob = props => {
    const {
        min,
        max,
        value,
        formatter,
        onValueChange,
        size,
        stepValue,
        enabled: controlEnabled,
        tabIndex,
    } = props;
    const clampedValue = Math.max(min, Math.min(value, max));
    const normalisedValue = (clampedValue - min) / (max - min);
    const end = normalisedValue * (ANGLE_END - ANGLE_START) + ANGLE_START;
    const height = getHeight(size);
    const fineAdjust = max - min > height;
    const { enabled, useDisabledStyles } = useGroupEnabledState(controlEnabled);

    const handleDragMove = useCallback(
        (startValue, dX, dY) => {
            const dV = fineAdjust
                ? getFineDragValue(dY, min, max)
                : getLinearDragValue(dY, min, max);
            const newValue = Math.max(min, Math.min(startValue - dV, max));
            if (onValueChange) {
                onValueChange(newValue);
            }
        },
        [onValueChange, min, max, fineAdjust]
    );

    const handleKeyDown = useCallback(
        e => {
            const { key } = e;
            let newValue = clampedValue;
            if (key === 'ArrowUp') {
                e.preventDefault();
                newValue += stepValue;
            } else if (key === 'ArrowDown') {
                e.preventDefault();
                newValue -= stepValue;
            }
            newValue = Math.max(min, Math.min(newValue, max));

            if (newValue !== clampedValue) {
                onValueChange(newValue);
            }
        },
        [onValueChange, clampedValue, stepValue, min, max]
    );

    const displayText = formatter ? formatter(clampedValue) : clampedValue;

    return (
        <div
            className={classNames('knob', {
                'ui-element--disabled': !enabled && useDisabledStyles,
            })}
            {...useDrag(handleDragMove, clampedValue)}
            tabIndex={enabled ? tabIndex : -1}
            onKeyDown={handleKeyDown}
        >
            <Centre>
                <div className="knob__number" style={{ height: `${size}px` }}>
                    <Centre>{displayText}</Centre>
                </div>
                <svg width={size} height={height}>
                    <Arc
                        className="knob__track"
                        cx={size / 2}
                        cy={size / 2}
                        radius={size / 2 - 6}
                        start={ANGLE_START}
                        end={ANGLE_END}
                    ></Arc>
                    <Arc
                        className="knob__indicator"
                        cx={size / 2}
                        cy={size / 2}
                        radius={size / 2 - 2}
                        start={ANGLE_START}
                        end={end}
                    ></Arc>
                </svg>
            </Centre>
        </div>
    );
};
Knob.defaultProps = {
    enabled: true,
    size: 80,
    stepValue: 1,
    useDisabledStyles: true,
    tabIndex: 0,
};

export default Knob;
