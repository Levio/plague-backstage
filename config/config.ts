import { IConfig } from 'umi-types';
import routes from './router.config';
import proxy from './proxy.config';
import webpackPlugin from './plugin.config';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  routes,
  hash: true,
  targets: {
    ie: 11,
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  manifest: {
    basePath: '/',
  },
  proxy,
  chainWebpack: webpackPlugin,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'BACKSTAGE',
        dll: false,
        locale: {
          default: 'zh-CN',
        },

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};

export default config;
