import { defineConfig } from 'dumi';
import { SiteThemeConfig } from 'dumi-theme-lobehub';

const homepage = '';
const themeConfig: SiteThemeConfig = {
  actions: [
    {
      icon: 'Github',
      link: homepage,
      openExternal: true,
      text: 'Github',
    },
    {
      link: '/ui',
      text: 'Get Started',
      type: 'primary',
    },
  ],
  apiHeader: false,
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
    discord: 'https://discord.gg/AYFPHvv2jT',
    github: homepage,
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
  // apiParser: {},
  // resolve: {
  //   entryFile: './src/index.ts'
  // },
  themeConfig,
});
