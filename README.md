# Deployeur, a plugin to use WordPress as a headless CMS!

## 📖 Description

This plugin is not only a simple way to deploy your WordPress website to Netlify or Vercel hosting using Webhooks.
It also empowers WordPress with features that allow users to launch a deploy only when they are ready to.

Indeed, static site generation often come with benefits of better security, better speed and lower carbon footprint.
So far we had only seen solutions that triggered a deploy each time a post was published or updated by a user.
Triggering multiple builds in a row wasn't really consistent with the spirit of designing environmentally friendly websites.

That is why we started the Deployeur's adventure!


## 📦 Installation

1. Upload the plugin files to the `/wp-content/plugins/` directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Go to the Deployeur settings page
4. Select your hosting provider and set your webhook URL
5. (Up next) Go to the Site settings tab and enter your front-end domain name into the public URL field

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

Contributions, issues and feature requests are welcome!
To see how to contributes and the code of conduct, see the [contributing file](CONTRIBUTING.md).
