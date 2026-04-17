# 贡献指南

感谢关注《2030处理器设计》。本仓库是书的**可读副本**（Markdown），
原始 LaTeX 源由作者独立维护、不公开，因此贡献流程与一般开源代码仓略有不同。

## 欢迎的反馈

### 1. 内容错误 / 错别字 / 引用错漏 → 提 Issue

打开 [Issues 页面](https://github.com/fengyuwang/2030-processor-design/issues)，
用 "勘误" 模板报告（若无模板直接写明）：

- 出现位置：**章节链接 + 具体段落/公式/图号**（比如 "ch07 的表 7.3 第 2 行"）
- 问题描述：**错了什么** + **应该是什么**
- 若有参考依据（论文、技术文档、规格书）请附上

作者会在下一次 GitBook 同步（从 LaTeX 源重新导出）时统一合并修正。**请不要直接
修改 `docs/**/*.md` 并提 PR** —— 这样的 PR 会被关闭，因为下一次源头同步会
覆盖你的改动。

### 2. 站点外观 / 交互改进 → 欢迎 PR

以下文件的 PR 非常欢迎：

- `docs/.vitepress/config.ts` / `sidebar.json`（导航、搜索、主题配置）
- `docs/.vitepress/theme/*.css`（自定义 CSS）
- `.github/workflows/deploy.yml`（CI）
- `docs/index.md` / `docs/about.md`（首页介绍文案改进）

这些文件在 [LICENSE-CODE](./LICENSE-CODE) (MIT) 下，PR 合入即同样许可发布。

### 3. 技术讨论 → Discussions

关于书中内容的深入讨论、不同设计方案的比较、工业界新进展的补充建议，
欢迎到 GitHub Discussions（如仓库开启）或直接在 Issues 里讨论。

## 不接受的

- **直接修改 `docs/part*/ch*.md` 的 PR**：如上所述，会被源端覆盖
- **添加新章节的 PR**：新章节必须先在 LaTeX 源里撰写，作者再同步过来
- **商业用途**（比如把本书作为付费课程材料）：违反 CC BY-NC-SA 4.0

## 许可

提交贡献即视为你同意：

- 对 **Markdown / 图片** 的修改提议（通过 Issue 的文字形式）：作者合并时按
  CC BY-NC-SA 4.0 发布；你的贡献以同样协议公开
- 对 **仓库内代码**（`.vitepress/`、CSS、CI）的 PR：以 MIT 协议合并

## 行为准则

请保持友善与专业。技术讨论对事不对人。
