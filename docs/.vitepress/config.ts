import { defineConfig } from 'vitepress'
import container from 'markdown-it-container'
import katex from 'katex'
import fs from 'node:fs'
import path from 'node:path'
// Phase 2：侧边栏改为由 scripts/build-sidebar.py 从 latex/main.tex 自动生成。
// 生成产物即本目录下的 sidebar.json；每次 `pnpm run convert` 都会刷新它。
import sidebar from './sidebar.json' with { type: 'json' }

// 本书自定义宏（与 latex/processor-design.sty 对齐）
const KATEX_MACROS: Record<string, string> = {
  '\\CPI':    '\\mathrm{CPI}',
  '\\IPC':    '\\mathrm{IPC}',
  '\\MIPS':   '\\mathrm{MIPS}',
  '\\FLOPS':  '\\mathrm{FLOPS}',
  '\\Tcycle': 'T_{\\mathrm{cycle}}',
  '\\Texec':  'T_{\\mathrm{exec}}',
  '\\Speedup': '\\mathrm{Speedup}',
  '\\missrate':    'r_{\\mathrm{miss}}',
  '\\hitrate':     'r_{\\mathrm{hit}}',
  '\\misspenalty': 't_{\\mathrm{penalty}}',

  // siunitx 近似（pandoc 常把 \SI{3}{nm} 等翻成原样）
  '\\SI':  '#1\\,\\text{#2}',
  '\\si':  '\\text{#1}',
  '\\num': '#1',
  '\\qty': '#1\\,\\text{#2}',

  // siunitx 的 text-mode 字符宏——KaTeX 原生不认识，显式定义
  '\\textmu':      '\\mu',
  '\\textohm':     '\\Omega',
  '\\textOmega':   '\\Omega',
  '\\textdegree':  '{}^{\\circ}',
  '\\textcelsius': '{}^{\\circ}\\mathrm{C}',
  '\\textmicro':   '\\mu',
  '\\textangstrom': '\\text{Å}',
  '\\degree':      '{}^{\\circ}',
  '\\celsius':     '{}^{\\circ}\\mathrm{C}',
  '\\angstrom':    '\\text{Å}',
  '\\micro':       '\\mu',
  '\\ohm':         '\\Omega',

  // 常用 LaTeX 宏 KaTeX 可能不认
  '\\textbf':   '\\mathbf{#1}',
  '\\textit':   '\\mathit{#1}',
  '\\textrm':   '\\mathrm{#1}',
  '\\textsf':   '\\mathsf{#1}',
  '\\texttt':   '\\mathtt{#1}',
  '\\emph':     '\\mathit{#1}'
}

/** 自写的 markdown-it 数学插件：直接调用 KaTeX 0.16 的 renderToString，
 *  保证输出 HTML 结构和本项目打包的 katex.min.css 完全匹配（换 markdown-it-katex@2
 *  那种老包会输出 2016 年的类名与现代 CSS 对不上，造成"公式每字符一行"）。
 */
function katexPlugin(md: any) {
  const renderTex = (src: string, displayMode: boolean): string => {
    // 渲染前剥离 AMS-only 的"档案标签"类宏：我们在 math 外面已经用 <a id>/<div id>
    // 做锚点，math 内的 \label/\tag/\nonumber/\notag 在 KaTeX 下会原样回显"label"
    // 文字或报错，必须清掉。
    src = src.replace(/\\label\{[^}]*\}/g, '')
             .replace(/\\tag\{[^}]*\}/g, '')
             .replace(/\\nonumber\b/g, '')
             .replace(/\\notag\b/g, '')
    try {
      return katex.renderToString(src, {
        displayMode,
        throwOnError: false,
        errorColor: '#c00',
        macros: KATEX_MACROS,
        strict: 'ignore'
      })
    } catch (e: any) {
      return `<span class="katex-error" style="color:#c00">${md.utils.escapeHtml(src)}</span>`
    }
  }

  // Inline: $...$ （不允许 $ 紧跟空格或数字；与 pandoc tex_math_dollars 对齐）
  md.inline.ruler.after('escape', 'math_inline', (state: any, silent: boolean) => {
    if (state.src[state.pos] !== '$') return false
    const start = state.pos + 1
    if (state.src[state.pos + 1] === '$') return false
    // 单行 inline math：遇到换行即放弃（md 预处理会把跨行 `$...$` 压为单行）
    let pos = start
    let found = -1
    while (pos < state.posMax) {
      const ch = state.src[pos]
      if (ch === '\\') { pos += 2; continue }
      if (ch === '$') { found = pos; break }
      if (ch === '\n') return false
      pos++
    }
    if (found === -1 || found === start) return false
    const content = state.src.slice(start, found)
    if (/^\s/.test(content) || /\s$/.test(content)) return false
    if (!silent) {
      const token = state.push('math_inline', '', 0)
      token.markup = '$'
      token.content = content
    }
    state.pos = found + 1
    return true
  })

  // Block: $$...$$
  md.block.ruler.after('blockquote', 'math_block', (state: any, start: number, end: number, silent: boolean) => {
    const lineStart = state.bMarks[start] + state.tShift[start]
    if (state.src.slice(lineStart, lineStart + 2) !== '$$') return false
    // 允许 $$...$$ 在一行
    let line = start
    let content = ''
    const firstLine = state.src.slice(lineStart + 2, state.eMarks[line])
    if (firstLine.trim().endsWith('$$')) {
      if (silent) return true
      const token = state.push('math_block', '', 0)
      token.markup = '$$'
      token.content = firstLine.trim().replace(/\$\$$/, '')
      state.line = start + 1
      return true
    }
    // 多行：扫到闭合的 $$
    let found = false
    content = firstLine + '\n'
    for (line = start + 1; line < end; line++) {
      const ls = state.bMarks[line] + state.tShift[line]
      const le = state.eMarks[line]
      const text = state.src.slice(ls, le)
      if (text.trim() === '$$' || text.trim().endsWith('$$')) {
        content += text.replace(/\$\$\s*$/, '')
        found = true
        break
      }
      content += text + '\n'
    }
    if (!found) return false
    if (silent) return true
    const token = state.push('math_block', '', 0)
    token.markup = '$$'
    token.content = content
    state.line = line + 1
    return true
  }, { alt: ['paragraph'] })

  md.renderer.rules.math_inline = (tokens: any[], idx: number) =>
    renderTex(tokens[idx].content, false)
  md.renderer.rules.math_block = (tokens: any[], idx: number) =>
    `<div class="math-display">${renderTex(tokens[idx].content, true)}</div>\n`
}

const SITE_BASE = process.env.BASE ?? '/2030ProcessorDesign/'
// 线上可抓取的完整 URL（用于 sitemap / robots / og 等）。
// 自定义域名时设 HOSTNAME=https://your-domain.com BASE=/。
const SITE_HOSTNAME = process.env.HOSTNAME ?? 'https://skylerroy.github.io'
const SITE_URL = SITE_HOSTNAME + SITE_BASE.replace(/\/$/, '')

// Google Search Console / Bing 等搜索引擎站长验证码（拿到后填这里）。
// 也可以改成放一个实际的验证文件：把 Google 给的 googleXXX.html 丢到
// docs/public/ 目录，它会被自动部署到站点根。
const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION ?? ''

export default defineConfig({
  lang: 'zh-CN',
  // GitHub Pages 项目站点：站点服务在 /<repo>/ 子路径下。环境变量 BASE 可
  // 覆盖，用于自定义域名（BASE=/）或别的子路径。
  base: SITE_BASE,
  title: '2030处理器设计',
  titleTemplate: ':title · 2030处理器设计',
  description:
    '本书系统阐述面向 2030 年代的处理器设计原理与实践，涵盖从指令集架构到芯片系统级集成的完整知识体系。',

  lastUpdated: true,
  cleanUrls: true,
  // Phase 2 过渡期：侧边栏已列出全书 55 章 + 前言/附录/参考文献，但对应的
  // Markdown 页面由其它 Agent 异步生成，短期内仍可能缺页。阶段过渡期先用
  // `true` 兜底；Agent 1/2 合并完成后改回严格模式（false 或只列少量白名单）。
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'author', content: '王丰羽 assisted by Claude Code' }],
    // SEO / 搜索引擎优化
    ['meta', { name: 'keywords', content: '处理器设计,超标量处理器,乱序执行,分支预测,Cache,RISC-V,x86,ARM,Apple M,香山,UCIe,CXL,Chiplet,TAGE,ROB,微架构' }],
    ['meta', { property: 'og:type', content: 'book' }],
    ['meta', { property: 'og:title', content: '2030处理器设计' }],
    ['meta', { property: 'og:description', content: '面向 2030 年代的现代处理器微架构设计原理与工业实践，55 章、525 幅原创架构图。' }],
    ['meta', { property: 'og:image', content: SITE_URL + '/cover.svg' }],
    ['meta', { property: 'og:url', content: SITE_URL + '/' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    // Google Search Console 站长验证（GOOGLE_SITE_VERIFICATION 填了才输出）
    ...(GOOGLE_SITE_VERIFICATION
      ? [['meta', { name: 'google-site-verification', content: GOOGLE_SITE_VERIFICATION }] as any]
      : [])
  ],

  // 构建收尾时生成 sitemap.xml（供 Google / Bing 等抓取）
  buildEnd(siteConfig: any) {
    const outDir = siteConfig.outDir
    const pages = (siteConfig.pages as string[]).filter((p) => !p.startsWith('404'))
    const now = new Date().toISOString().slice(0, 10)
    const urls = pages.map((p: string) => {
      // docs/foo/bar.md → /foo/bar  （cleanUrls: true 没有 .html 后缀）
      const rel = p.replace(/\.md$/, '').replace(/\/index$/, '/')
      const url = SITE_URL + '/' + rel
      return (
        '  <url>\n' +
        `    <loc>${url}</loc>\n` +
        `    <lastmod>${now}</lastmod>\n` +
        '    <changefreq>monthly</changefreq>\n' +
        '  </url>'
      )
    }).join('\n')
    const sitemap =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urls + '\n' +
      '</urlset>\n'
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap, 'utf-8')
    console.log(`[buildEnd] sitemap.xml written with ${pages.length} urls`)
  },

  // VitePress 只会给 Markdown 链接 `[x](/path)` 自动加 base，不处理
  // 正文里的 raw HTML（<img src="/figures/..">、<a href="/bibliography#..">）。
  // 我们的 TikZ 图和参考文献引用都走 raw HTML，所以在每页 HTML 生成后做
  // 一次字符串替换补齐 base。只改**绝对根路径**开头的；外链保留不动。
  transformHtml(code) {
    if (SITE_BASE === '/') return code
    const b = SITE_BASE.replace(/\/$/, '')
    return code
      .replace(/(<img\b[^>]*\bsrc=")\/(figures\/)/g, `$1${b}/$2`)
      .replace(/(<a\b[^>]*\bhref=")\/(bibliography#)/g, `$1${b}/$2`)
      .replace(/(<a\b[^>]*\bhref=")\/(part[0-9]+\/ch[0-9]+)/g, `$1${b}/$2`)
  },

  markdown: {
    lineNumbers: false,
    config: (md) => {
      md.use(katexPlugin)
      // 自定义容器：::: tradeoff 设计权衡 N 标题
      md.use(container, 'tradeoff', {
        validate: (params: string) => !!params.trim().match(/^tradeoff\s*(.*)$/),
        render: (tokens: any[], idx: number) => {
          const m = tokens[idx].info.trim().match(/^tradeoff\s*(.*)$/)
          if (tokens[idx].nesting === 1) {
            const title = m && m[1] ? md.renderInline(m[1]) : '设计权衡'
            return `<div class="tradeoff custom-block"><p class="custom-block-title">${title}</p>\n`
          } else {
            return '</div>\n'
          }
        }
      })
    }
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '2030处理器设计',

    nav: [
      { text: '首页', link: '/' },
      { text: '开始阅读', link: '/part1/ch01' },
      { text: '关于', link: '/about' }
    ],

    sidebar,

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Skylerroy/2030ProcessorDesign'
      }
    ],

    footer: {
      message:
        '正文与图片：<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-Hans" target="_blank">CC BY-NC-SA 4.0</a> · 本仓库少量站点配置代码：MIT',
      copyright: '著：王丰羽 assisted by Claude Code'
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          'zh-CN': {
            translations: {
              button: {
                buttonText: '搜索书中内容',
                buttonAriaLabel: '搜索书中内容'
              },
              modal: {
                noResultsText: '未找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一章',
      next: '下一章'
    },

    lastUpdated: {
      text: '最近更新',
      formatOptions: { dateStyle: 'short', timeStyle: 'short' }
    },

    // editLink 指向源文本的编辑入口。本仓库只公开 Markdown（可读副本），
    // 原始 LaTeX 源由作者独立维护、不开源；因此不提供 editLink。
    // 勘误请到 GitHub Issues 反馈。

    langMenuLabel: '切换语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
