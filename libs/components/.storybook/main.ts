import type { Loader, StorybookConfig } from '@storybook/angular';

const repoName = process.env['GH_PAGES_REPO_NAME'] || 'ngx-e-commerce';
const publicPath = process.env['GH_PAGES'] ? `/${repoName}/` : '/';

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
  ],

  webpackFinal: async (config) => {
    // if (process.env['GH_PAGES']) {
    //   config.output = {
    //     ...config.output,
    //     publicPath: '/ngx-e-commerce/',
    //   };
    //   config.module = {
    //     ...config.module,
    //     rules: [
    //       ...(config.module?.rules ?? []),
    //       {
    //         test: /.component$/,
    //         use: [
    //           {
    //             loader: 'string-replace-loader',
    //             options: {
    //               search: /\/assets\/ngx-e-com\//g,
    //               replace: '/ngx-e-commerce/assets/ngx-e-com/',
    //             },
    //           },
    //         ],
    //       },
    //     ],
    //   };
    // }
    config.output = config.output || {};
    config.output.publicPath = publicPath;
    return config;
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
