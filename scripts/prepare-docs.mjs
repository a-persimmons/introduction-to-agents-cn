import { readdir, readFile, writeFile, mkdir, rm, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
process.chdir(root);
const out = '.book-docs';
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
const files = (await readdir('.')).filter(f => /^0\d-.*\.md$/.test(f)).sort();
if (files.length !== 7) throw new Error('Expected seven chapters; update navigation when adding chapters.');
const titles = [];
for (const file of files) {
  const source = await readFile(file, 'utf8');
  if ((source.match(/<mark>/g)||[]).length !== (source.match(/<\/mark>/g)||[]).length) throw new Error(`Unbalanced translation markers: ${file}`);
  if (source.includes('```')) throw new Error(`New code blocks in ${file}: review language extraction first.`);
  const heading = source.match(/^# (.*?) \| <mark>(.*?)<\/mark>/);
  if (!heading) throw new Error(`Missing bilingual title: ${file}`);
  titles.push({ file, en: heading[1], zh: heading[2] });
  // Treat multiline translations as one token, preserving lists and tables.
  // Extract from complete paragraphs: translations can contain newlines.
  const protectedSource = source.replace(/<mark>([\s\S]*?)<\/mark>/g, (_, value) => `<mark>${value.replaceAll('\n', '\u0000')}</mark>`);
  for (const locale of ['zh', 'en', 'bi']) {
    let index = 0;
    let references = false;
    const parts = protectedSource.split(/\n\s*\n/).map(block => {
      block = block.replaceAll('\u0000', '\n').trim();
      if (block === '---') references = false;
      if (block.startsWith('**References |')) references = true;
      const label = block.match(/^\*\*(.*?) \| <mark>(.*?)<\/mark>\*\*$/);
      if (label) return `**${locale === 'zh' ? label[2] : locale === 'en' ? label[1] : label[1] + ' · ' + label[2]}**`;
      if (/^\[IMAGE_\d+:/.test(block)) return '';
      if (/^#{1,6} /.test(block)) {
        const match = block.match(/^(#+) (.*?) \| <mark>([\s\S]*?)<\/mark>$/);
        if (!match) throw new Error(`Unexpected heading: ${file}: ${block}`);
        return `${match[1]} ${locale === 'zh' ? match[3] : locale === 'en' ? match[2] : `${match[2]} · ${match[3]}`} {#section-${++index}}`;
      }
      const translated = block.match(/^<mark>([\s\S]*?)<\/mark>$/);
      if (translated) return locale === 'en' ? '' : locale === 'bi' ? `::: tip 中文\n${translated[1]}\n:::` : translated[1];
      if (block.startsWith('>') && block.includes('<mark>')) {
        return block.split('\n').filter(line => locale === 'bi' || (locale === 'zh' ? line.includes('<mark>') : !line.includes('<mark>'))).join('\n').replace(/<\/?mark>/g, '');
      }
      if (block.includes('<mark>')) throw new Error(`Unexpected inline translation: ${file}: ${block}`);
      if (locale === 'zh' && !references && !/^(!\[|---$|\*\*November 2025\*\*)/.test(block)) return '';
      return block;
    }).filter(Boolean);
    let text = parts.join('\n\n').replaceAll('](images/', '](/images/');
    const dir = locale === 'zh' ? out : `${out}/${locale}`;
    await mkdir(dir, {recursive:true});
    await writeFile(`${dir}/${file}`, text + '\n');
    const imageCount = s => (s.match(/!\[/g)||[]).length;
    if (imageCount(text) !== imageCount(source)) throw new Error(`Missing image in ${locale}/${file}`);
  }
}
for (const locale of ['zh', 'en', 'bi']) {
  const en = locale === 'en';
  const prefix = locale === 'zh' ? '/' : `/${locale}/`;
  const title = en ? 'Introduction to Agents' : '智能体入门';
  const intro = en ? 'From Predictive AI to Autonomous Agents' : '从预测性 AI 到自主智能体';
  const page = `---\nlayout: home\nhero:\n  name: ${title}\n  text: ${intro}\n  tagline: ${en ? 'Seven chapters, eleven diagrams. Explore models, tools, orchestration and advanced agents.' : '7 个章节 · 11 张图解，从基础概念到模型、工具、编排与高级应用。'}\n  actions:\n    - theme: brand\n      text: ${en ? 'Start reading' : '开始阅读'}\n      link: ${prefix}${titles[0].file.replace('.md','')}\n    - theme: alt\n      text: ${en ? 'Original PDF' : '下载英文原书 PDF'}\n      link: /introduction-to-agents-cn/source/Introduction_to_Agents.pdf\n---\n\n## ${en ? 'Contents' : '阅读目录'}\n\n${titles.map((t,i)=>`${i+1}. [${en?t.en:t.zh}](${prefix}${t.file.replace('.md','')})`).join('\n')}\n\n${en ? 'Choose 简体中文, English, or 中英对照 from the language menu. Language switching keeps you in the same chapter and section.' : '顶部语言菜单可切换「简体中文」「English」「中英对照」，并保留当前章节与小节位置。'}\n\n## ${en ? 'Source and attribution' : '来源与致谢'}\n\n${en ? 'Based on the existing bilingual translation; this site changes presentation only.' : '本站根据仓库现有中英译文生成阅读视图，正文与翻译归原作者及译者所有。'}\n\n- [${en ? 'Translation project' : '原翻译项目'}](https://github.com/0xPabloxx/introduction-to-agents-cn)\n- [${en ? 'Book source' : '原书来源'}](https://www.kaggle.com/whitepaper-introduction-to-agents)\n- [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) · ${en ? 'For learning and non-commercial use' : '仅供学习与非商业用途'}\n`;
  await writeFile(`${out}/${locale === 'zh' ? '' : locale + '/'}index.md`,page);
}
await cp('.vitepress', `${out}/.vitepress`, {recursive:true});
await mkdir(`${out}/public`, {recursive:true});
await cp('images', `${out}/public/images`, {recursive:true});
await cp('source', `${out}/public/source`, {recursive:true});
console.log(`Prepared ${files.length * 3} chapter views and 3 home pages.`);
