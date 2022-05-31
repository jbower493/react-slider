import React from 'react';
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

    return (
        <div className={`ReactSlider`}>
            <div className={`ReactSlider__slider`}>
                <div className={`ReactSlider__active`} style={{ width: activeWidth }}>
                    <button className={`ReactSlider__handle`}></button>
                </div>
            </div>
        </div>
    );
};

export default Slider;
