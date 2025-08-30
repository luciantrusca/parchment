import {Meta, StoryObj} from "@storybook/react";
import { ComponentProps } from "react";
import TextPaneParchment from "./TextPaneParchment";

type StoryProps = ComponentProps<typeof TextPaneParchment>;

const meta: Meta<StoryProps> = {
    component: TextPaneParchment,    
    args: {
        text: "Sample text",
        title: "Sample title"
    }
};

export default meta;

type Story = StoryObj<StoryProps>;

export const red: Story = {
    args: {
        color: "red"
    }
};