({
  // Please visit the URL below for more information:
  // https://shd101wyy.github.io/markdown-preview-enhanced/#/extend-parser

  onWillParseMarkdown: async function(markdown) {
    const firstLine = markdown.slice(0, markdown.indexOf('\n'))
    const focusSectionTitleMatch = firstLine.match(/<!--\s*focusSection:\s*(.*?)\s*-->/)
    const focusSectionTitle = focusSectionTitleMatch?.[1]

    if (focusSectionTitle) {
      // Find the section of code starting with '# focusSectionTitle' then go until either the end of the doc or the next line starting with '# '
      const focusSectionRegex = new RegExp(
        `^# ${focusSectionTitle}$(?:\\n(?!^# ).*)*`,
        'gm'
      )

      const focusSectionMatch = markdown.match(focusSectionRegex)

      //return focusSectionMatch?.toString() ?? "oops"

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