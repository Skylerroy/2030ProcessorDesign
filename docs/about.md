# 关于本书

## 署名

**著：王丰羽 assisted by Claude Code**

王丰羽主导本书的整体架构、核心内容撰写与全书审校；
Claude Code（Anthropic）在章节撰写、代码示例、交叉引用整理与 RTL 案例追踪中
提供协助，并为本 GitBook 版搭建了站点构建流程。

**公开的内容**：本仓库只公开书的 **Markdown 可读副本** 与自动生成的图。
原始 LaTeX 源（书稿文本、TikZ 绘图源码）由作者独立维护，不在此公开。

## 与《超标量处理器设计》的关系

本书以姚永斌先生所著的《超标量处理器设计》（国内处理器微架构领域的开创性
著作）作为框架起点，面向 2030 年代的处理器设计实践进行全面扩展，主要方向
包括：

- **多架构视角**：同时覆盖 x86-64、AArch64、RISC-V 三大主流 ISA
- **工业级深度**：深入 RTL 设计层的权衡分析与 PPA（性能-功耗-面积）量化
- **前沿覆盖**：TAGE-SC 预测器、CXL、UCIe Chiplet、处理器安全、AI 加速集成
- **设计权衡导向**：每个方案都附"为什么不用 X"的替代方案分析

向原书作者姚永斌先生致以最高敬意。

## 双许可证

| 内容 | 许可 | 说明 |
|------|------|------|
| 正文、图片 | CC BY-NC-SA 4.0 | 署名 + 非商业 + 相同方式共享 |
| 仓库内的站点配置代码（`.vitepress/`、CSS、CI） | MIT | 允许商业、闭源派生 |

详见仓库根目录的 `LICENSE` 与 `LICENSE-CODE`。

## 联系方式

- GitHub Issues：<https://github.com/fengyuwang/2030-processor-design/issues>（错别字、内容建议、技术问题）
- GitHub Discussions：<https://github.com/fengyuwang/2030-processor-design/discussions>（开放讨论）

## 引用

如需在论文或书籍中引用本书：

```bibtex
@book{wang2030processor,
  title     = {2030处理器设计：从基础到超标量——面向未来的现代处理器微架构},
  author    = {王丰羽},
  year      = {2026},
  url       = {https://github.com/fengyuwang/2030-processor-design},
  note      = {assisted by Claude Code}
}
```
