({
  // Please visit the URL below for more information:
  // https://shd101wyy.github.io/markdown-preview-enhanced/#/extend-parser

  onWillParseMarkdown: async function(markdown) {
    return focusedMarkdown() ?? linkTest() ?? markdown

    function linkTest() {
      const idx = markdown.indexOf('\n')
      const secondLine = markdown.slice(idx, markdown.indexOf('\n', idx + 1))
      const checkLinksMatch = secondLine.match(/<!--\s*checkLinks:\s*(.*?)\s*-->/)
      const checkLinksRaw = checkLinksMatch?.[1]

      const checkLinks = checkLinksRaw === 'true'
      globalThis.__checkLinks__ = checkLinks

      return undefined
    }

    function focusedMarkdown() {
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
      } else {
        return undefined
      }
    }
  },

  onDidParseMarkdown: async function(html) {
    if (globalThis.__checkLinks__) {
      const hrefRegex = /href=["']#*([^"']+)["']/g; // Capture all fragment links
      const idRegex = /id=["']([^"']+)["']/g; // Capture all element IDs

      const hrefTargets = [...html.matchAll(hrefRegex)].filter(m => !m[1].startsWith('http'));
      const existingIds = new Set([...html.matchAll(idRegex)].map(match => match[1]));

      // Find broken links (hrefs that don't match any existing id)
      const brokenLinks = hrefTargets.filter(target => !existingIds.has(target[1]));
      return [...brokenLinks].map(m => m[1])
    }

    return html;
  },
})