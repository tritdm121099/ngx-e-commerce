import type { Meta, StoryObj } from '@storybook/angular';
import { ComponentsComponent } from './components.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ComponentsComponent> = {
  component: ComponentsComponent,
  title: 'ComponentsComponent',
};
export default meta;
type Story = StoryObj<ComponentsComponent>;

export const Primary: Story = {
  args: {},
};
