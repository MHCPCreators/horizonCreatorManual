({
  // Please visit the URL below for more information:
  // https://shd101wyy.github.io/markdown-preview-enhanced/#/extend-parser

  onWillParseMarkdown: async function(markdown) {
    const firstLine = markdown.slice(0, markdown.indexOf('\n'))
    const focusSectionTitleMatch = firstLine.match(/<!--\s*focusSection:\s*(.*?)\s*-->/)
    const focusSectionTitleRaw = focusSectionTitleMatch?.[1]

    if (focusSectionTitleRaw) {
      const focusSectionTitle = focusSectionTitleRaw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

      const focusSectionRegex = new RegExp(
        `^# ${focusSectionTitle}$(?:\\n(?!^# ).*)*`,
        'gm'
      )

      const focusSectionMatch = markdown.match(focusSectionRegex)

      if (focusSectionMatch) {
        return focusSectionMatch.join('\n\n')
      }
    }

    return markdown
  },

  onDidParseMarkdown: async function(html) {
    return html;
  },
})