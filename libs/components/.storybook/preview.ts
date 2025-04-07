import {
  withThemeByClassName,
  withThemeByDataAttribute,
} from '@storybook/addon-themes';
import { Preview } from '@storybook/angular';

export const decorators = [
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

export const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
  },
};
