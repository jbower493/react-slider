import React, {
    useRef,
    KeyboardEvent,
    MouseEvent,
    TouchEvent,
    RefObject
} from 'react';
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
    const sliderRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    const activeWidth: string = `${(current / max) * 100}%`;

    const incrementSlider = (): void => {
        if (current < max) onSliderChange(current + step);
    };

    const decrementSlider = (): void => {
        if (current > min) onSliderChange(current - step);
    };

    const handleMouseMove = (e: MouseEventInit): void => {
        const mouseX: number | undefined = e.clientX;

        const sliderRect: DOMRect | undefined = sliderRef.current?.getBoundingClientRect();
        const sliderMinX: number | undefined = sliderRect?.left;
        const sliderMaxX: number | undefined = sliderRect?.right;

        if (mouseX === undefined || sliderMinX === undefined || sliderMaxX === undefined) return;

        const possibleValues: { value: number; x: number; }[] = [];
        const numOfValues: number = ((max - min) / step);
        const widthOfOneSegment: number = (sliderMaxX - sliderMinX) / numOfValues;

        let j: number = 1;
        for (let i: number = min; i <= max; i += step) {
            const xValue: number = widthOfOneSegment * j;
            possibleValues.push({ value: i, x: xValue });
            j++;
        }

        // Exit if its trying to increase beyond the max or decrease beyond the min
        if (mouseX > sliderMaxX || mouseX < sliderMinX) return;
        
        const newValueObj: { value: number; x: number; } | undefined = possibleValues.find((valueObj: { value: number; x: number; }, index: number) => mouseX >= valueObj.x && mouseX < possibleValues[index + 1].x);

        if (typeof newValueObj?.value === 'number' && newValueObj.value !== current) onSliderChange(newValueObj.value);
    };

    const handleTouchMove = (e: TouchEventInit): void => {
        
    };

    const onMouseDown = (e: MouseEvent): void => {
        const onMouseUp = (e: MouseEventInit): void => {
            document.removeEventListener('mousemove', handleMouseMove);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', onMouseUp, { once: true });
    };

    const onTouchStart = (e: TouchEvent): void => {
        const onTouchEnd = (e: TouchEventInit): void => {
            document.removeEventListener('touchend', handleTouchMove);
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', onTouchEnd, { once: true });
    };

    const onKeyDown = (e: KeyboardEvent): void => {
        
    };

    return (
        <div className={`ReactSlider`}>
            <div
                ref={sliderRef}
                className={`ReactSlider__slider`}
            >
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
