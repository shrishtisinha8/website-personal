# Shrishti Sinha — Personal website

This is the complete personal website with the latest neutral/plum palette, your portrait, the tighter circular logo, and your Calendly, email, and LinkedIn links. Your résumé and writing still have coming-soon states until you add them.

For GitHub storage and automatic Vercel deployments, start with [GITHUB-SETUP.md](GITHUB-SETUP.md).

## Start here: upload without GitHub or a command line

1. Extract the complete package and locate the folder named `public`.
2. Sign in to Vercel and visit [Vercel Drop](https://vercel.com/drop).
3. Upload the `public` folder, or use the separately supplied `shrishti-vercel-upload.zip`.
4. Choose your account/team and a project name, then select Deploy. The homepage is `index.html`.

Vercel Drop publishes to production. For later changes, upload the updated `public` folder to that existing project's dashboard. Using Drop's new-project page again creates another project. [Official Drop instructions](https://vercel.com/docs/drop).

Upload the website folder or website-only ZIP for this method; keep the full package as your editable backup.

## What is included?

```text
shrishti-vercel-website/
  README.md
  EDITING-GUIDE.md
  vercel.json
  .gitignore
  public/
    index.html
    styles.css
    portrait.css
    app.js
    content.js
    assets/
      shrishti-portrait.png
      shrishti-mark.svg
      favicon.svg
```

All files needed to display the website are in `public`. There are no site dependencies, environment variables, API keys, database, or required build command. `vercel.json` configures the full project for static hosting from `public`.

Your résumé PDF is not included because you have not supplied it. To add it, save it as `public/assets/resume.pdf`, set `resumeUrl: 'assets/resume.pdf'` in `public/content.js`, and deploy the updated folder. The button will then open your PDF.

## Edit your content

Open `public/content.js` as plain text to edit your bio, contact links, projects/roles, and writing. Use `EDITING-GUIDE.md` for examples. Main headlines and interest descriptions are in `public/index.html`.

You can preview the site by opening `public/index.html` locally. Editing local files does not update a deployed website until you publish the changed files.

## Optional: connect GitHub for automatic updates

Upload the contents of this project folder to a repository in your own GitHub account. Put `vercel.json` at the repository's top level, alongside `public`.

In Vercel, create a new project and import that repository. Select the root containing `vercel.json`; use the settings below, then deploy. Later pushes to the connected production branch can trigger deployments. [Vercel Git deployment guide](https://vercel.com/docs/git).

| Setting | Value |
| --- | --- |
| Root Directory | Folder containing `vercel.json`, normally the repository root |
| Framework Preset | Other |
| Build Command | Empty; skip the build |
| Output Directory | `public` |
| Install Command | Leave at the default; this site has no package dependencies |
| Environment Variables | None required |

The included configuration selects Other, skips the build, and serves `public`. [Static configuration](https://vercel.com/docs/project-configuration/vercel-json), [build settings](https://vercel.com/docs/builds/configure-a-build).

## Optional: deploy from your computer using Vercel CLI

With Node.js installed, open a terminal in the folder containing `vercel.json` and run:

```sh
npx vercel@latest --prod
```

Sign in when prompted, choose your account, and follow the project setup prompts. Use the same linked project for future updates. [CLI deployment instructions](https://vercel.com/docs/cli/deploy).

## Costs and access

Vercel's Hobby plan is free for personal, non-commercial use and has usage limits. If the site becomes a commercial service, review the applicable plan. A custom domain is optional and can involve a separate registration/renewal cost. [Hobby plan](https://vercel.com/docs/plans/hobby).

This package has no ChatGPT sign-in requirement. Access to the hosted copy depends on your Vercel project's deployment-protection settings. Once deployed, open the URL while signed out to check that your intended visitors can see it.

## If you see a 404 or missing content

- For Drop, upload `public` or the website-only ZIP, and select `index.html` as the root page if asked.
- For a Git/CLI deployment, make sure Vercel's project root contains `vercel.json` and that `public/index.html` is present.
- Keep the `assets` folder and file names unchanged. Place a new résumé PDF inside that folder.
- After an edit, deploy the updated files and refresh the website. If needed, refresh without cache.

The included file paths, scripts, configuration, and ZIP contents were checked locally. Deployment to your Vercel account happens when you upload or import this package.

Prepared October 19, 2026.
