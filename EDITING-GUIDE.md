# Editing your website

You can update this website by editing a few plain text files. Use a code editor, or a text editor in plain-text mode. Do not use Word or a rich-text document to edit code.

## Which file does what?

| File inside `public` | What you change there |
| --- | --- |
| `content.js` | Your bio, résumé link, contact links, projects/roles, and articles |
| `index.html` | Main headline, navigation labels, section introductions, and interests |
| `styles.css` | Main layout, colors, and text sizes |
| `portrait.css` | Portrait/logo sizing and styles for new work and writing |
| `app.js` | Navigation and the code that displays your editable content |
| `assets/` | Your illustration, logo, PDF résumé, and other files |

Keep the file names, quotation marks, commas, and brackets. Save changes, then refresh the browser. If the page stops updating after an edit, undo the last change and check those marks.

## Add or replace your résumé

1. Save your PDF as `resume.pdf` inside `public/assets/`.
2. In `public/content.js`, find `resumeUrl: ''` and change it to:

```js
resumeUrl: 'assets/resume.pdf',
```

3. Save the file and refresh the page. The button will become “View my résumé” and open the PDF in a new tab.
4. Upload the whole updated `public` folder, including the PDF. To replace your résumé later, replace that PDF and upload again.

The PDF becomes accessible to visitors who can access the site. Include the contact details you want readers to see.

## Update your bio or links

Edit `aboutParagraphs` in `content.js`. Each quoted item becomes a paragraph. The first is displayed as the lead paragraph. For text with apostrophes, use double quotes around the whole item, or backticks for longer text.

Your existing Calendly, email, and LinkedIn links are already filled in. To change them, replace the values of `calendlyUrl`, `email`, or `linkedinUrl`. Empty values hide the corresponding contact link; an empty résumé or Calendly URL shows its coming-soon state.

To change the homepage headline or interests, open `index.html`, search for the exact visible words, and replace the text between the HTML tags. Keep tags such as `<h1>`, `<p>`, and `<br>`.

## Add a project or a role

Replace `work: []` with a list like this, using your real information:

```js
work: [
  {
    title: "Your project or role title",
    detail: "What you did, what you learned, and the outcome.",
    url: ""
  }
],
```

Leave `url` empty if you do not have a link. Otherwise use a full HTTPS address, or a path to a file in `assets`. Add another object after the first one to add more entries; separate objects with a comma.

Entries appear inside “Projects & experience.” The site will keep the coming-soon message if the list stays empty.

## Publish writing

Replace `writing: []` with a list like this. The example below is a template, not an article already on your site:

```js
writing: [
  {
    title: "Your article title",
    date: "Month Year",
    excerpt: "A short introduction to the piece.",
    body: `Your first paragraph goes here.

Your second paragraph goes here.`,
    url: ""
  }
]
```

Use backticks around `body` to write multiple lines. A blank line starts a new paragraph. Text is displayed as plain text, not HTML or Markdown. Clicking the article title expands the piece.

If your article is on another website, set `url` to its HTTPS address. You can leave `body` empty and use an excerpt plus that link. An article needs a title and either body text or a valid link to appear. The coming-soon message disappears when at least one article is added.

## Preview and upload changes

Open `public/index.html` locally and check your text, résumé, and contact links. For a server preview, you can also run this optional command from inside the `public` folder if Python is installed:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. Stop the preview with Ctrl+C when finished.

Upload the updated `public` folder to the existing project on your host. Replacing your local files alone does not change the hosted site. If the old version still appears, refresh without cache or open a private browser window.

## Using Overleaf for your résumé

Overleaf is a LaTeX document editor. Keep the website's HTML, CSS, and JavaScript on a website host. You can create your résumé in Overleaf, compile it, then download the PDF. Save the downloaded file as `public/assets/resume.pdf` and set `resumeUrl` as shown above. Re-upload your website folder whenever you replace the PDF; Overleaf edits do not automatically update the website.

[Overleaf overview](https://docs.overleaf.com/getting-started/how-do-i-use-overleaf) · [PDF download instructions](https://docs.overleaf.com/managing-projects-and-files/downloading-a-project)
