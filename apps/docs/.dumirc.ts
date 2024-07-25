import { defineConfig } from 'dumi';
import { SiteThemeConfig } from 'dumi-theme-lobehub';

const gitRepo = 'https://gitlab.stardustgod.com/lijie/cmsfe.git';
import {  name } from './package.json';
const themeConfig: SiteThemeConfig = {
  actions: [
    {
      icon: 'Github',
      link: gitRepo,
      openExternal: true,
      text: 'Github',
    },
    {
      link: '/ui',
      text: 'Get Started',
      type: 'primary',
    },
  ],
  hideHomeNav: true,
  apiHeader: {
    // docUrl: `{github}/tree/master/src/{atomId}/index.md`,
    match: ['/docs', '/ui'],
    pkg: '@cmsfe/ui',
    // sourceUrl: `{gitRepo}/tree/master/src/{atomId}/index.tsx`,
  },
  description: '',

  footer: 'Made with 🤯 by CMS',
  // giscus: {
  //   category: 'Q&A',
  //   categoryId: 'DIC_kwDOJloKoM4CXsCu',
  //   repo: 'lobehub/lobe-ui',
  //   repoId: 'R_kgDOJloKoA',
  // },
  logoType: 'flat',

  name: 'cmsfe',
  socialLinks: {
    github: gitRepo,
  },
  title: 'cmsfe',
  features: [],

  footerConfig: {
    columns: [],
  },
};
export default defineConfig({
  mfsu: false,
  ssr: false,
  apiParser: {},
  resolve: {
    entryFile: './src/index.tsx'
  },
  themeConfig,
  extraPostCSSPlugins: [require('tailwindcss'), require('autoprefixer')],
});
