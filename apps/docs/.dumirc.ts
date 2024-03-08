import { defineConfig } from 'dumi';
import { SiteThemeConfig } from 'dumi-theme-lobehub';

const homepage = ''
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
  description: 'Lobe UI is an open-source UI component library for building chatbot web apps',
  footer: 'Made with 🤯 by LobeHub',
  giscus: {
    category: 'Q&A',
    categoryId: 'DIC_kwDOJloKoM4CXsCu',
    repo: 'lobehub/lobe-ui',
    repoId: 'R_kgDOJloKoA',
  },
  logoType:'flat',
  
  name: '',
  socialLinks: {
    discord: 'https://discord.gg/AYFPHvv2jT',
    github: homepage,
  },
  title: 'cmsfe',
  features:[]
};
export default defineConfig({
  mfsu: false,
  ssr : false,
  // apiParser: {},
  // resolve: {
  //   entryFile: './src/index.ts'
  // },
  themeConfig,
});
