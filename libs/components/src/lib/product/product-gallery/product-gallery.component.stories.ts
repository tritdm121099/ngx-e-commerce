import { provideAnimations } from '@angular/platform-browser/animations';
import {
  applicationConfig,
  argsToTemplate,
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
        src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
        alt: 'Mountains and Lake',
        thumbnailSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
      },
      {
        id: 2,
        type: 'image',
        src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
        alt: 'Valley',
        thumbnailSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
      },
      {
        id: 3,
        type: 'image',
        src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
        alt: 'Pug Dog',
        thumbnailSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
      },
      {
        id: 4,
        type: 'image',
        src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg',
        alt: 'Bird',
        thumbnailSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg',
      },
      {
        id: 5,
        type: 'image',
        src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5s.jpg',
        alt: 'Mountain Road',
        thumbnailSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria5s.jpg',
      },
      {
        id: 6,
        type: 'image',
        src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6s.jpg',
        alt: 'Waves',
        thumbnailSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria6s.jpg',
      },
      {
        id: 7,
        type: 'image',
        src: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
        alt: 'Books',
        thumbnailSrc:
          'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
      },
    ],
  },
  render: (args) => ({
    template: `
      <ngx-e-com-product-gallerry ${argsToTemplate(
        args
      )}></ngx-e-com-product-gallerry>
    `,
    props: args,
  }),
};
