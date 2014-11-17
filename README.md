Thrashers
=========

Collection of special thrasher containers/snaps for the frontend project. View them all the [Thrasher front](http://m.code.dev-theguardian.com/thrashers).


## Installation

You will need

 * [Node.js](http://nodejs.org/)
 * [Bower](http://bower.io/)
 * [Bundler](http://bundler.io/)

Then install the project dependencies with

```
npm install
```

Ruby dependencies 
```
bundle
```

Sass components (not required but advised)
```
bower install
```

## Usage

To create a new project use (It's best practice to name your embed after the container title)
```
grunt new --name=the-name-of-your-embed
```

This will create a copy of the template inside `\embeds`.

Then `cd` into that folder and run the follow command to watch for changes and compile the json file.
```
grunt local --folderName=the-name-of-your-embed
```

## Deployment

If you're ready to deploy to s3, you'll need your aws keys for the `gu-aws-interactive` account. Use [`aws-keys.example.json`](aws-keys.example.json) to create a `aws-keys.json` file and replace the default values with your Access and Secret AWS keys.

Then to deploy run the following. The folderName variable is optional but without it, you'll be deploying all embeds which might take a while.
```
grunt aws_s3 --folderName=the-name-of-your-embed
```

or the following for continuous deployment, which will watch for changes then deploy once the `source.json` is complete
```
grunt remote --folderName=the-name-of-your-embed
```
