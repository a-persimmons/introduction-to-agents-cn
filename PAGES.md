# VitePress 阅读站

访问地址：https://a-persimmons.github.io/introduction-to-agents-cn/

## 首次开启 GitHub Pages

1. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
2. 如果 fork 的 Actions 尚未启用，在 **Actions** 页启用工作流。
3. 运行 **Publish bilingual VitePress site** 工作流；已有失败记录时选择 **Re-run failed jobs**。

以后推送到 `main` 自动构建部署，Pull Request 只检查构建。

## 本地预览

使用 Node.js 22：

```sh
npm ci
npm run docs:dev
```

正式构建：`npm run docs:build`；构建后预览：`npm run docs:preview`。

## 内容维护

当前版本为 **Updated May 2026**，见 [版本说明](EDITION-2026.md)。根目录 7 个章节 Markdown 是唯一网站正文源，原图和英文 PDF 保留。修改源文后重新构建即可自动生成：

- `/`：中文阅读，默认入口。
- `/en/`：英文阅读。
- `/bi/`：中英逐段对照。

语言菜单跳转到同一章节，小节使用一致的锚点。中文段落由原文件的 `<mark>` 标签提取，网站对照视图使用独立的中文提示块，避免整段黄色高亮干扰阅读。源文件格式保持原样。

`npm run docs:prepare` 生成 `.book-docs/`，不要手动编辑或提交该目录。脚本会检查章节数、翻译标签和各视图图片数量；新增章节、代码块或改变双语标记格式时应同步检查提取逻辑及导航。英文原图中的文字不做改写，未翻译的参考文献仍使用英文。

网站包含本地全文搜索、章节目录、上一章/下一章、深色模式及移动端布局。保留原翻译项目链接、原书链接和 CC BY-NC 4.0 署名与许可说明。
