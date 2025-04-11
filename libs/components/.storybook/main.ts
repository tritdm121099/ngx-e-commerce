import type { Loader, StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-styling-webpack',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  staticDirs: [
    {
      from: './public',
      to: 'assets',
    },
    {
      from: '../src/public',
      to: 'assets/ngx-e-com',
    },
  ],
  webpackFinal: async (config) => {
    if (process.env['GH_PAGES']) {
      if (config && config.module && config.module.rules) {
        config.module.rules.push({
          test: /.component.*.ts/,
          loader: 'string-replace-loader',
          options: {
            search: '/assets/',
            replace: '/notion-publish-tool/assets/',
          },
        });
      }
    }
    return config;
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
