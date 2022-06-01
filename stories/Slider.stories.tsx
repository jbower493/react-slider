import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Slider from './Slider';
import SliderLogicContainer from './SliderLogicContainer';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/Slider',
    component: Slider
} as ComponentMeta<typeof Slider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Slider> = (args) => (
    <SliderLogicContainer>
        {(current: number, onSliderChange: (newValue: number) => void) => (
            <Slider
                {...args}
                current={current}
                onSliderChange={onSliderChange}
            />
        )}
    </SliderLogicContainer>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
    max: 10,
    min: 1,
    step: 1
};
