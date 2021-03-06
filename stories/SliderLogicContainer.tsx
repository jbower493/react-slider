import { useState } from 'react';

interface Props {
    children: (curent: number, onSliderChange: (newValue: number) => void) => JSX.Element
};

const SliderLogicContainer = ({ children }: Props): JSX.Element => {
    const [current, setCurrent] = useState<number>(2);

    const onSliderChange = (newValue: number) => {
        setCurrent(newValue);
    };

    return children(current, onSliderChange);
};

export default SliderLogicContainer;