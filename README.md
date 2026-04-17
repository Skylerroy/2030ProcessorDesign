# 《2030处理器设计》

> 从基础到超标量 —— 面向未来的现代处理器微架构
>
> **著：王丰羽 assisted by Claude Code**

一本系统讲解 2030 年代主流处理器微架构设计的中文技术书。从指令集架构起步，
覆盖 Cache 与存储层次、分支预测、乱序执行引擎、真实处理器案例（Intel
Golden/Lion Cove、AMD Zen 4/5、Apple M 系列、香山昆明湖）、多核与存储
系统，以及 Chiplet、CXL、UCIe 等 2020 年代末的前沿进展。

**8 篇 55 章，约 9 万行 Markdown，525 张原创架构图**。

## 在线阅读

<https://skylerroy.github.io/2030ProcessorDesign/>（CI 部署后生效）

本仓库公开的是本书的 **可读 Markdown 副本**，搭配一个 VitePress 站点壳让
在线阅读体验接近纸质书（章节目录、全文中文搜索、公式与图清晰渲染）。

## 关于源文本

本书的**原始 LaTeX 源**（含 TikZ 图源码、参考文献 bib、排版样式）由作者
独立维护，**不在此仓库公开**。本仓库里的 Markdown 是作者周期性地从 LaTeX
源导出的快照。

也就是说：

- ✅ 你可以**阅读**本书（在线或本地）
- ✅ 你可以**引用**本书（见 [CITATION](./docs/about.md) 的 BibTeX）
- ✅ 你可以**按 CC BY-NC-SA 4.0 的条款转载、衍生**（署名 + 非商业 + 相同方式共享）
- ❌ 你**不能**从这个仓库重新编译出 PDF 或 LaTeX 源（必要资源不公开）
- ❌ 你**不能**将本书用于商业目的（CC 非商业条款）

## 本地预览（可选）

如果你想在本地跑一个可交互的站点：

```bash
git clone <this-repo>
cd 2030-processor-design
pnpm install
pnpm run docs:dev        # 开发模式，热重载
# 或
pnpm run docs:build      # 打包
pnpm run docs:preview    # 预览打包产物
```

依赖：Node 20+、pnpm 10+。

## 贡献

欢迎反馈内容错误、笔误、事实偏差、引用错漏等。流程在 [CONTRIBUTING.md](./CONTRIBUTING.md)：

- **报错别字 / 事实错误 / 引用错漏** → GitHub Issues（作者在下一次同步时修正源头 LaTeX）
- **站点外观、交互改进** → 欢迎 PR（只需要改 `docs/.vitepress/` 下的 CSS / TS）
- **直接修改章节 Markdown 的 PR 将被关闭**，因为下一次同步会被源端覆盖

## 许可

- **正文与图片**：[CC BY-NC-SA 4.0](./LICENSE)（署名 · 非商业 · 相同方式共享）
- **仓库内的站点配置代码**（`docs/.vitepress/`、CSS、CI）：[MIT](./LICENSE-CODE)

具体划分见 [NOTICE.md](./NOTICE.md)。

## 致谢

感谢姚永斌先生所著的《超标量处理器设计》——本书以该经典著作的框架为起点，
面向 2030 年代进行了扩展与深化。详见 [关于本书](./docs/about.md)。
