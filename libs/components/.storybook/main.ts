import type { Loader, StorybookConfig } from '@storybook/angular';

const repoName = 'ngx-e-commerce';
const isGhPages = process.env['GH_PAGES'] === 'true';
const publicPath = isGhPages ? `/${repoName}/` : '/';

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
      from: '../src/public',
      to: 'assets/ngx-e-com',
    },
    {
      from: './public',
      to: 'assets/ngx-e-com',
    },
  ],

  webpackFinal: async (config) => {
    config.module = {
      ...config.module,
      rules: [
        ...(config.module?.rules ?? []),
        {
          test: /.component$/,
          use: [
            {
              loader: 'string-replace-loader',
              options: {
                search: /\/assets\/ngx-e-com\//g,
                replace: '/ngx-e-commerce/assets/ngx-e-com/',
              },
            },
          ],
        },
      ],
    };
    // config.output = config.output || {};
    // config.output.publicPath = publicPath;
    return config;
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
