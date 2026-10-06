# 2026 年 5 月版更新说明

本站正文依据用户提供的 `2026_IntroductionToAgents.pdf`，封面版本为 **Updated May 2026**。共 54 页，7 章、11 张图。原书作者为 Alan Blount、Antonio Gulli、Shubham Saboo、Michael Zimmermann 和 Vladimir Vuskovic。

## 与 2025 年 11 月版的差异

对两份 PDF 全文逐词比较，排除页眉、页脚、换行及分页差异后，主要更新如下：

| 位置（新版 PDF 页码） | 更新内容 |
| --- | --- |
| 第 4 章，第 20 页 | 模型路由示例改为 Gemini 3.2 Pro、Gemini 3.2 Flash 系列和 Gemma 4 |
| 第 4 章，第 26–27 页 | 部署平台改为 Gemini Enterprise Agent Platform；新增 Agent Studio、Agent Runtime、Memory Bank；替换图 4 与图注链接 |
| 第 4 章，第 29–30 页 | 补充 Agent Simulation、Agent Evaluation |
| 第 4 章，第 30–31 页 | 补充 Agent Observability、Agent Optimizer |
| 第 4 章，第 32 页 | 补充 Gemini Enterprise 应用中的 A2UI 原生界面交互 |
| 第 4 章，第 36 页 | 补充 Agent Identity 与唯一密码学身份标识 |
| 第 4 章，第 38–39 页 | 更新 Agent Gateway 与 Model Armor 的关系 |
| 第 4 章，第 41–42 页 | 补充 Agent Gateway、Agent Registry 和可复用 Skills 的治理说明 |
| 第 5 章，第 49 页；第 7 章，第 54 页 | 新增 AlphaEvolve 引文及第 46 条尾注 |

其余正文沿用原有中英译文；章节版本标记统一为 2026 年 5 月，旧页眉标题同步更新。2026 版目录未列出“Policies to Constrain Access”，但第 37 页仍保留该节，因此网站保留该节。新版致谢中的人员调整可在原 PDF 中查看。

## 来源与保真

- `source/Introduction_to_Agents.pdf` 已替换为上传的新 PDF，文件字节与上传件一致；原下载路径保持不变。
- `source/edition.json` 记录版本与 SHA-256，便于核对。
- `chapters/chapter*.txt` 已从新 PDF 重新提取，并带有原书页码标记。
- 图 4 从新 PDF 提取，其余 10 张图在两版 PDF 中的嵌入图像内容一致。
- 本次只依据上传版本做版本迁移，不将书中产品声明视为另行验证的最新产品文档；名称、功能与时效性措辞按原书保留。
- 原书第 39 条尾注仍为 `TKTK`，保持原样。部署段落中的英文语法问题也按原书保留，中文按上下文表达。
- 原翻译项目及其 CC BY-NC 4.0 许可与署名继续保留。2025 版文件可从 Git 历史获取。

## 阅读站

默认中文，可切换 English 或中英对照；切换保持章节及小节位置。更新根目录的双语 Markdown 后运行 `npm run docs:build`，由 GitHub Actions 部署。
