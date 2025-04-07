import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { ProductCardComponent } from './product-card.component';
import { provideAnimations } from '@angular/platform-browser/animations';

const meta: Meta<ProductCardComponent> = {
  component: ProductCardComponent,
  title: 'ProductCardComponent',
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};
export default meta;
type Story = StoryObj<ProductCardComponent>;

export const Primary: Story = {
  args: {
    product: {
      id: '1',
      title: 'Ribbed Tank Top',
      imageUrl: '/assets/image_1.png',
      originalPrice: 26,
      discountedPrice: 18,
      discountPercentage: 31,
    },
    badges: ['FLASH SALE', '31% OFF', 'FLASH SALE', '31% OFF'],
  },
};
