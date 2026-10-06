import { defineConfig } from 'vitepress';
import { readdirSync, readFileSync } from 'node:fs';
const chapters = readdirSync(process.cwd()).filter(f => /^0\d-.*\.md$/.test(f)).sort().map(f => {
  const title = readFileSync(f, 'utf8').match(/^# (.*?) \| <mark>(.*?)<\/mark>/)!;
  return { slug: f.replace('.md',''), en: title[1], zh: title[2] };
});
function locale(key: string, label: string, lang: string) {
  const en = key === 'en', prefix = key === 'root' ? '/' : `/${key}/`;
  return { label, lang, title: en ? 'Introduction to Agents' : '智能体入门', themeConfig: {
    nav: [{text: en ? 'Read' : '开始阅读', link: prefix + chapters[0].slug}, {text: en ? 'Contents' : '目录', link: prefix}],
    sidebar: [{text: en ? 'Introduction to Agents' : '智能体入门', items: chapters.map((c,i) => ({text: `${i+1}. ${en ? c.en : c.zh}`, link: prefix+c.slug}))}],
    outline: {label: en ? 'On this page' : '本页目录', level: [2,3] as [number,number]},
    docFooter: {prev: en ? 'Previous chapter' : '上一章', next: en ? 'Next chapter' : '下一章'},
    sidebarMenuLabel: en ? 'Chapters' : '章节目录', returnToTopLabel: en ? 'Back to top' : '返回顶部',
    langMenuLabel: '切换阅读语言', darkModeSwitchLabel: '切换外观',
    footer: {message: 'CC BY-NC 4.0 · 原作者与译者保留署名 · 仅供学习及非商业用途'}
  }};
}
export default defineConfig({
  base: '/introduction-to-agents-cn/',
  description: '智能体入门：中文、英文与中英对照阅读，从预测性 AI 到自主智能体。',
  locales: { root: locale('root','简体中文','zh-CN'), en: locale('en','English','en'), bi: locale('bi','中英对照','zh-CN') },
  themeConfig: {
    socialLinks: [{icon: 'github', link: 'https://github.com/a-persimmons/introduction-to-agents-cn'}],
    search: {provider:'local', options:{miniSearch:{options:{tokenize: text => Array.from(new Intl.Segmenter('zh-CN',{granularity:'word'}).segment(text)).filter(s=>s.isWordLike).map(s=>s.segment)}},locales:{root:{translations:{button:{buttonText:'搜索全书',buttonAriaLabel:'搜索全书'},modal:{noResultsText:'没有找到相关内容',resetButtonTitle:'清除搜索',footer:{selectText:'选择',navigateText:'切换',closeText:'关闭'}}}}}}}
  }
});
