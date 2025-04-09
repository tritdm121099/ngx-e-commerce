import { provideAnimations } from '@angular/platform-browser/animations';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { ThreeDViewComponent } from './3d-view.component';

const meta: Meta<ThreeDViewComponent> = {
  component: ThreeDViewComponent,
  title: 'Atoms / 3D View',
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};
export default meta;
type Story = StoryObj<ThreeDViewComponent>;

export const NeilArmstrong: Story = {
  args: {
    modelUrl: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
    altText: '3d model',
    autoRotate: true,
    cameraControls: true,
    enableAR: true,
    environmentImage: '',
  },
};

export const Chair: Story = {
  args: {
    modelUrl: 'https://modelviewer.dev/assets/ShopifyModels/Chair.glb',
    altText: '3D model chair',
    autoRotate: true,
    cameraControls: true,
    enableAR: true,
    environmentImage: '',
  },
};