import React, {
    useRef,
    useMemo,
    KeyboardEvent,
    MouseEvent,
    TouchEvent,
    RefObject,
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
    const nodeContainerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

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
    const updateSlider = (newValue: number | undefined): void => {
        if (typeof newValue === 'number' && newValue <= max && newValue >= min) onSliderChange(newValue);
    };

    const handleMouseMove = (e: MouseEventInit): void => {
        const mouseX: number | undefined = e.clientX;

        const sliderRect: DOMRect | undefined = sliderRef.current?.getBoundingClientRect();
        const sliderMinX: number | undefined = sliderRect?.left;
        const sliderMaxX: number | undefined = sliderRect?.right;

        if (mouseX === undefined || sliderMinX === undefined || sliderMaxX === undefined || !nodeContainerRef.current) return;
        
        const nodes: Element[] = Array.from(nodeContainerRef.current.children);
        const getCorrectNodeIndex = (): number => {
            if ( mouseX > sliderMaxX) return nodes.length - 1;
            if ( mouseX < sliderMinX) return 0;

            return nodes.findIndex((node: Element, index: number) => {
                const { left, right } = node.getBoundingClientRect();
                return mouseX >= left && mouseX < right;
            })
        }

        const newValue: number | undefined = values.find((value: number, index: number) => index === getCorrectNodeIndex());
        
        updateSlider(newValue);
    };

    const onTouchMove = (e: TouchEvent): void => {
        e.preventDefault();
        e.stopPropagation();

        const touchX: number | undefined = e.touches ? e.touches[0].clientX : undefined;

        const sliderRect: DOMRect | undefined = sliderRef.current?.getBoundingClientRect();
        const sliderMinX: number | undefined = sliderRect?.left;
        const sliderMaxX: number | undefined = sliderRect?.right;

        if (touchX === undefined || sliderMinX === undefined || sliderMaxX === undefined || !nodeContainerRef.current) return;
        
        const nodes: Element[] = Array.from(nodeContainerRef.current.children);
        const getCorrectNodeIndex = (): number => {
            if ( touchX > sliderMaxX) return nodes.length - 1;
            if ( touchX < sliderMinX) return 0;

            return nodes.findIndex((node: Element, index: number) => {
                const { left, right } = node.getBoundingClientRect();
                return touchX >= left && touchX < right;
            })
        }

        const newValue: number | undefined = values.find((value: number, index: number) => index === getCorrectNodeIndex());
        
        updateSlider(newValue);
    };

    const onMouseDown = (e: MouseEvent): void => {
        const onMouseUp = (e: MouseEventInit): void => {
            document.removeEventListener('mousemove', handleMouseMove);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', onMouseUp, { once: true });
    };

    const onKeyDown = (e: KeyboardEvent): void => {
        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowUp':
                e.preventDefault();
                updateSlider(current + step);
                break;
            case 'ArrowLeft':
            case 'ArrowDown':
                e.preventDefault();
                updateSlider(current - step);
                break;
            default:
                break;
        }
    };

    return (
        <div className={`ReactSlider`}>
            <div
                ref={sliderRef}
                className={`ReactSlider__slider`}
            >
                <div
                    ref={nodeContainerRef}
                    className={`ReactSlider__nodeContainer`}
                >
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className={`ReactSlider__node${index <= values.indexOf(current) ? ' ReactSlider__node--active' : ''}`}
                        />
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
                        onTouchMove={onTouchMove}
                        onKeyDown={onKeyDown}
                    />
                </div>
            </div>
        </div>
    );
};

export default Slider;
