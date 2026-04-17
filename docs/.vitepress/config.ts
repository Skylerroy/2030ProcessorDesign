import { defineConfig } from 'vitepress'
import container from 'markdown-it-container'
// Phase 2：侧边栏改为由 scripts/build-sidebar.py 从 latex/main.tex 自动生成。
// 生成产物即本目录下的 sidebar.json；每次 `pnpm run convert` 都会刷新它。
import sidebar from './sidebar.json' with { type: 'json' }

export default defineConfig({
  lang: 'zh-CN',
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
    ['meta', { name: 'author', content: '王丰羽 assisted by Claude Code' }]
  ],

  markdown: {
    lineNumbers: false,
    // VitePress 1.6 原生支持数学（底层即 markdown-it-mathjax3）
    math: true,
    config: (md) => {
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
