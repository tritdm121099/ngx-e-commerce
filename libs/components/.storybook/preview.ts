import {
  withThemeByClassName,
  withThemeByDataAttribute,
} from '@storybook/addon-themes';
import { Preview } from '@storybook/angular';

const decorators = [
  withThemeByDataAttribute({
    themes: {
      light: 'light',
      dark: 'dark dark:bg-gray-900',
    },
    defaultTheme: 'light',
    attributeName: 'data-mode',
  }),
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
  },
  decorators,
};


export default preview;