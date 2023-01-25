# Deployeur, a plugin to use WordPress as a headless CMS!

## 📖 Description

This plugin is not only a simple way to deploy your WordPress website to Netlify or Vercel hosting using Webhooks.
It also empowers WordPress with features that allow users to launch a deploy only when they are ready to.

Indeed, static site generation often come with benefits of better security, better speed and lower carbon footprint.
So far we had only seen solutions that triggered a deploy each time a post was published or updated by a user.
Triggering multiple builds in a row wasn't really consistent with the spirit of designing environmentally friendly websites.

That is why we started the Deployeur's adventure!

## 🚀 Features
What is this plugin doing ?
### For developers
1. Link your WordPress installation to Vercel or Netlify
2. Allow your editors to deploy their contents form the WordPress dashboard
3. Display the average build time to your content editors to keep them nicely waiting
4. Display the Netlify status Badge into the WordPress dashboard

### For content editors
1. Review the last changes made to your contents before deploying them to your public website
2. Check the Netlify build status of your last deploy directly from your WordPress dashboard 
3. Consult the history of deployed made with the plugin into the WordPress dashboad

## 📦 Installation

1. Upload the plugin files to the `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Go to the Deployeur settings page.
4. In the "Hosting settings" tab: select your hosting provider and set your webhook URL.
5. If you select Netlify, fill the Netlify badge URL field with your Netlify's site ID.
6. In the "Site settings" tab: fill the public URL field with your front-end domain name to add it to the WordPress's API.

## 📝 Changelog

-  See the changelog [here](CHANGELOG.md)

<!-- Development guide -->

## 🛠 Development

### Requirements

-  [Node.js](https://nodejs.org/en/) >= 16.0.0

### Installation

1. Clone the repository

```bash
git clone git@github.com:MediakodTeam/wp-plugin-deployeur.git # using SSH - preferred
```

2. Install the dependencies

```bash
yarn install # or npm install
```

3. Start the "watch" task

```bash
yarn dev # or npm run dev
```

4. Build the plugin

```bash
yarn build # or npm run build
```

## 🤝 Contribute
This plugin is at an early stage of its life. We have already ideas to improve it. The next one on our list will be to add a custom endpoint to manage WordPress images through ImageKit and tweak the WordPress APi to use it. It could also be considered to set user roles permissions to access the plugins settings, etc.
If you find this plugin useful, we welcome all contributions, issues and feature requests!
To see how to contributes and the code of conduct, see the [contributing file](CONTRIBUTING.md).
