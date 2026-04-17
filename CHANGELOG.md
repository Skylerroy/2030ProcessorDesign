# 更新日志

所有重要变更将记录在这里。
格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，版本号遵循 [Semantic Versioning](https://semver.org/lang/zh-CN/)。

## [v0.2.0] - 2026-04

**GitBook 版正式发布**。8 篇 55 章 + 辅文（前言 / 符号 / 致谢 / 两个附录 / 参考文献）以 Markdown 副本 + 525 张原创架构图（SVG）公开出版。

### 新增
- **VitePress 站点**：Vue 3 + KaTeX + 中文本地搜索；覆盖深浅色主题、响应式布局
- **8 篇 55 章全量上线**
  - 第一篇 超标量处理器基础（ch01–ch04）
  - 第二篇 Cache 与存储层次（ch05–ch12）
  - 第三篇 分支预测（ch13–ch17，含 TAGE-SC）
  - 第四篇 指令集与解码（ch18–ch23）
  - 第五篇 乱序执行引擎（ch24–ch39，核心 16 章）
  - 第六篇 真实世界的处理器（ch40–ch44；Intel Golden/Lion Cove、AMD Zen 4/5、Apple M、香山昆明湖等案例）
  - 第七篇 多核与存储系统（ch45–ch48）
  - 第八篇 先进处理器发展（ch49–ch55；CXL、UCIe Chiplet、安全、AI 集成）
- **辅文全量**：`preface.md` / `notation.md` / `acknowledgments.md` / `appendix/riscv.md` / `appendix/verilog.md` / `bibliography.md`
- **自动化部署**：GitHub Actions push 到 `main` 自动构建 VitePress 站点并发布到 GitHub Pages
- **站点资源**：封面 SVG、logo、favicon（纯 SVG，无字体依赖）

### 说明
- 本仓库公开的是书的 **Markdown 可读副本**；原始 LaTeX 源（TikZ 绘图源码、参考文献 bib、排版样式）由作者独立维护，不在此公开。
- Markdown 副本由作者周期性地从 LaTeX 源导出；勘误请到 GitHub Issues 反馈，下一次同步时修正。

## [v0.1.0] - 2026-01

- LaTeX 初稿完成（第一、二、三版）
- 完成 8 篇 55 章主体内容撰写
- 确立全书"投机 + 并行 + 工艺约束"的三维统一视角
