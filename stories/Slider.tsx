import React, {
    useRef,
    useMemo,
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

    // Constants
    const sliderRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    const values: number[] = useMemo(() => {
        return Array(((max - min) / step) + 1)
            .fill(1)
            .map((item: number, index) => min + (index * step));
    }, []);

    const getActiveWidth = (): string => {
        if (current === min) return '0%';
        if (current === max) return '100%';

        return `${(((current - step) / (values.length - 1))) * 100}%`;
    };

    // Functions
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
                <div className={`ReactSlider__nodeContainer`}>
                    {values.map((value, index) => (
                        <div className={`ReactSlider__node${index <= values.indexOf(current) ? ' ReactSlider__node--active' : ''}`} />
                    ))}
                </div>
                <div
                    className={`ReactSlider__active`}
                    style={{ width: getActiveWidth() }}
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
