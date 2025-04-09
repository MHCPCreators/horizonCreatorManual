# Horizon Creator Manual

The Horizon Creator Manual is a community-source, Meta-endorsed guide on using the Meta Horizon Worlds creation tools.

## Contributing

To contribute to the Creator Manual, create a pull request. Keep all pull requests focused; they should focus on one topic, one bug, localized edits, etc. Avoid creating pull requests that make multiple unrelated edits all at once. Do your best to create links throughout the doc whenever making edits!

If you are fixing types or grammar, yoy can simply create a pull request. If you are updating facts or creating new sections, please include in your summary: what work and testing you have done to verify that the information is fully correct.

**DCO**: when creating a pull request, you MUST include [DCO](https://discord.com/channels/@me/1359226259661393920/1359646860830179460) in your commits. The easiest was is with `git commit -s -m ...`. See the [dco docs](https://discord.com/channels/@me/1359226259661393920/1359646860830179460) for more info.

### How To Edit Locally

In VSCode install the extension [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced). Open the file `HorizonTechnicalDoc.md` in VSCode and then open the Markdown preview using:
  * Mac: cmd-k v
  * Windows: ctrl-k v

The docs on the extension are [here](https://shd101wyy.github.io/markdown-preview-enhanced/#/).

#### Fast Preview When Editing

Editing the entire doc can be very slow (if you have the preview open). At the very top of the doc is the line:

```
<!--focusSection: -->
```

You can put the name of a top-level section there, such as:

```
<!--focusSection: Instances -->
```

and the preview editor will only render that part of the doc! Please don't submit a PR with any changes to that line.

#### Checkings Links

When editing, it's easy to accidentally delete a link or make a mistake in the format. You can modify the second line of the doc to be

```
<!--checkLinks: true -->
```

and instead of rendering the doc, it will render an overview of any broken links. Please don't submit a PR with any changes to that line.

### Generating the PDF

When you want to "generate the PDF" make sure the preview tab is open. Click this [≣] icon in the bottom right (you may have to hover there for it to be visible) and then click:
```
Export > Chrome (Puppeteer) > PDF
```
