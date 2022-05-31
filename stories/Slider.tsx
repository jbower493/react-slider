import React, { KeyboardEvent, MouseEvent, TouchEvent } from 'react';
import './slider.css';

interface SliderProps {
    // Maximum slider value
    max: number;
    // Minimum slider value
    min: number;
    // Current value
    current: number;
    // Step value
    step: number;
    // Function to be called when the slider is dragged to a different node
    onSliderChange: (newValue: number) => void;
}

/**
 * Primary UI component for user interaction
 */
const Slider = ({
    max,
    min,
    current,
    step,
    onSliderChange
}: SliderProps): JSX.Element => {
    const activeWidth: string = `${(current / max) * 100}%`;

    const onMouseDown = (e: MouseEvent): void => {
        console.log('mouse down');
    };

    const onTouchStart = (e: TouchEvent): void => {
        console.log('touch start');
    };

    const onKeyDown = (e: KeyboardEvent): void => {
        console.log('key down');
    };

    return (
        <div className={`ReactSlider`}>
            <div className={`ReactSlider__slider`}>
                <div
                    className={`ReactSlider__active`}
                    style={{ width: activeWidth }}
                >
                    <button
                        type="button"
                        className={`ReactSlider__handle`}
                        onMouseDown={onMouseDown}
                        onTouchStart={onTouchStart}
                        onKeyDown={onKeyDown}
                    />
                </div>
            </div>
        </div>
    );
};

export default Slider;
