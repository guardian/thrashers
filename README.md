Thrashers
=========

Collection of special thrasher containers/snaps for the frontend project. View them all the [Thrasher front](http://m.code.dev-theguardian.com/thrashers).


## Installation

You will need

 * [Node.js](http://nodejs.org/)
 * [Bower](http://bower.io/)

Then install the project dependencies with

```
npm install
```

Sass components (not required but advised)
```
bower install
```

## Usage

To create a new project use
```
grunt new --folderName=the-name-of-your-embed
```

This will create a copy of the template inside `\embeds`.

Then `cd` into that folder and run the following command to watch for changes and compile the json file.
```
grunt local --folderName=the-name-of-your-embed
```

## Embedding

To preview your Thrasher on the site it will need to be added to a front with it's own container. For development and archival reasons, add it to the bottom of the [Thrasher front](http://m.code.dev-theguardian.com/thrashers) on `CODE`.

The first thing that you'll need to do is create a new container with the name of the thrasher in the Facia Fronts Config tool. Make sure to pick `fixed/small/slow/I` as you'll only need one item. Best practices would be to name it the same as your classes' name space and embed folder. This way anyone can look at the embeds folder and instantly figure out the appropriate name of the container.

You'll then need the snapURL by running
```
grunt paths --folderName=the-name-of-your-embed
```

The returned values are also output by [#deployment](Deployment) commands list below. If the returned values are wrong run
```
grunt update --folderName=the-name-of-your-embed
```

to update the values originally set with `grunt new`. The appropriate snapURL then needs to be added to your container using the [Facia Fronts Tool](https://fronts.code.dev-gutools.co.uk/editorial?front=thrashers). You'll need drag it in as an active link into the clipboard and then dragged to the appropriate container.

You should now see your thrasher at the bottom of the [Thrasher front](http://m.code.dev-theguardian.com/thrashers) on `CODE`.

## Deployment

If you're ready to deploy to s3, you'll need your aws keys for the `gu-aws-interactive` account. Use [`aws-keys.example.json`](aws-keys.example.json) to create an `aws-keys.json` file and replace the default values with your Access and Secret AWS keys.

Then to deploy run the following. The `folderName` variable is optional but without it, you'll be deploying all embeds which might take a while.
```
grunt aws_s3 --folderName=the-name-of-your-embed
```

or the following for continuous deployment, which will watch for changes then deploy once the `source.json` is complete
```
grunt remote --folderName=the-name-of-your-embed
```
