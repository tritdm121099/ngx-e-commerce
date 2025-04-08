import { provideAnimations } from '@angular/platform-browser/animations';
import {
  applicationConfig,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { ProductGalleryComponent } from './product-gallery.component';

const meta: Meta<ProductGalleryComponent> = {
  component: ProductGalleryComponent,
  title: 'Product / Gallery',
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
  ],
};
export default meta;
type Story = StoryObj<ProductGalleryComponent>;

export const Primary: Story = {
  args: {
    items: [
      {
        id: 1,
        type: 'image',
        src: '/assets/image_8.jpg',
        alt: 'Mountains and Lake',
        thumbnailSrc: '/assets/image_8.jpg',
      },
      {
        id: 2,
        type: 'image',
        src: '/assets/image_2.jpg',
        alt: 'Valley',
        thumbnailSrc: '/assets/image_2.jpg',
      },
      {
        id: 3,
        type: 'image',
        src: '/assets/image_3.jpg',
        alt: 'Pug Dog',
        thumbnailSrc: '/assets/image_3.jpg',
      },
      {
        id: 4,
        type: 'image',
        src: '/assets/image_4.jpg',
        alt: 'Bird',
        thumbnailSrc: '/assets/image_4.jpg',
      },
      {
        id: 5,
        type: 'image',
        src: '/assets/image_5.jpg',
        alt: 'Mountain Road',
        thumbnailSrc: '/assets/image_5.jpg',
      },
      {
        id: 6,
        type: 'image',
        src: '/assets/image_6.jpg',
        alt: 'Waves',
        thumbnailSrc: '/assets/image_6.jpg',
      },
      {
        id: 7,
        type: 'image',
        src: '/assets/image_7.jpg',
        alt: 'Books',
        thumbnailSrc: '/assets/image_7.jpg',
      },
    ],
    isLoop: true,
  } as unknown as Story['args'],
};
