# Keep the website on GitHub and deploy with Vercel

GitHub stores the website's source and edit history. Vercel can publish it when changes are pushed to your connected production branch. [Vercel Git integration](https://vercel.com/docs/git).

## Repository setup

Suggested repository name: `personal-website`.

A private repository is a suitable starting point: you can keep the source private and connect Vercel to publish the website. Use a repository under your personal GitHub account for the simplest setup with Vercel Hobby.

1. Sign in to GitHub and choose **New repository**.
2. Select your own account as owner, name the repository, and choose its visibility.
3. Create the repository. This package already includes a README and `.gitignore`.
4. Choose **Add file → Upload files**, or the initial upload link on an empty repository.
5. Upload the extracted project's contents, including the `public` folder, `vercel.json`, and documentation. Upload the actual files rather than the ZIP archive.
6. Save the upload with a commit message such as `Add personal website`.

Keep this structure at the repository's top level:

```text
README.md
EDITING-GUIDE.md
GITHUB-SETUP.md
vercel.json
.gitignore
public/
  index.html
  content.js
  app.js
  styles.css
  portrait.css
  assets/
```

The important point is that `vercel.json` and `public` are siblings. Do not upload only the outer ZIP or create an extra enclosing folder unless you plan to select that folder as Vercel's Root Directory.

[Create a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository) · [Upload files](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository).

## Connect Vercel

In Vercel, create a project and import your GitHub repository. Use the root containing `vercel.json`. The included configuration selects **Other**, leaves the build command empty, and serves **public**. Deploy the project.

If you already deployed through Vercel Drop, you can connect a Git repository afterward. Check the project's Git settings and connect the intended repository. Use the same `public` output directory. [Deployment methods and Git connections](https://vercel.com/docs/drop).

## Make future changes

Edit `public/content.js` for your bio, projects, articles, and résumé link. You can edit a text file on GitHub and commit it, or edit it locally and push the changes. Your connected production branch then becomes the source for Vercel updates.

To add your résumé, upload `public/assets/resume.pdf` and set `resumeUrl: 'assets/resume.pdf'` in `public/content.js`. Follow `EDITING-GUIDE.md` for other content changes.

This workflow uses GitHub for source storage and Vercel for hosting. GitHub Pages does not need to be enabled.
