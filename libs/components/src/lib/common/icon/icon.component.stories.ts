import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { SvgIconComponent } from 'angular-svg-icon';
import { provideNgxECom } from '../../libs.provide';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<SvgIconComponent> = {
  component: SvgIconComponent,
  title: 'Atoms / Icons',
  decorators: [
    applicationConfig({
      providers: [provideNgxECom(), provideHttpClient()],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const List: Story = {
  args: {
    icons: [
      '/assets/ngx-e-com/icons/chevron-down_outline.svg',
      '/assets/ngx-e-com/icons/chevron-left_outline.svg',
      '/assets/ngx-e-com/icons/chevron-right_outline.svg',
      '/assets/ngx-e-com/icons/chevron-up_outline.svg',
      '/assets/ngx-e-com/icons/image_outline.svg',
      '/assets/ngx-e-com/icons/play_outline.svg',
      '/assets/ngx-e-com/icons/cube_outline.svg',
    ],
  },
  render: (args) => ({
    template: `
      @for (icon of icons; track icon) {
        <div class="flex flex-nowrap gap-2 items-center">
          <svg-icon src="{{icon}}" [svgStyle]="{ 'width.px':30 }">
          </svg-icon>
          {{icon}}
        </div>
      }
    `,
    props: args,
  }),
};
