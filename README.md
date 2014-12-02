Thrashers
=========

Collection of special Thrasher containers/snaps for the [frontend](https://github.com/guardian/frontend) project. View them all the [Thrasher front](http://m.code.dev-theguardian.com/thrashers).


## Installation

You will need

 * [Node.js](http://nodejs.org/)
 * [Bower](http://bower.io/)

Then install the project dependencies with
```
npm install
```

and
```
bower install
```

## Usage

### Creating your Thrasher

Get started by creating a new Thrasher with
```
grunt new --folderName=the-name-of-your-embed
```

This will create a folder with the required files at `/embeds/the-name-of-your-embed`. You will be prompted to enter some information about the snap, this is fallback information for while the snap is loading or if it fails. You can always [update](#snapurls) this later.

You are now ready to build your Thrasher using the `style.scss` and `index.html` inside your newly created folder. In order to see your changes though you'll need to compile a `source.json` file and embed the Thrasher on a front.

### Compiling and Deploying

Through the snapURL, the fronts receive a compiled `source.json` file that will include minified versions of your `css` and `html`. There are two ways to compile the JSON, locally and remotely. Both options will watch your folder for changes, compile the relevant file and return snapURLs. The only difference between the two is that one will run a local server and one will upload to S3.

To run locally, use
```
grunt local --folderName=the-name-of-your-embed
```

To run remotely, you'll need to add AWS Keys. Use [`aws-keys.example.json`](aws-keys.example.json) to create an `aws-keys.json` file and replace the default values with your key values from the `gu-aws-interactive` AWS Account. From then on use
```
grunt remote --folderName=the-name-of-your-embed
```

To compile and deploy *everything* run the above commands without the `--folderName` option. **WARNING: This should be done with caution, as it might take a while to compile all Thrashers**

### Creating the container

To preview your Thrasher on the site it will need to be added to a front with it's own container. For development and archival reasons, add it to the bottom of the [Thrasher front](http://m.code.dev-theguardian.com/thrashers) on `CODE`.

The first thing that you'll need to do is create a new container with the name of the thrasher in the Facia Fronts Config tool. Make sure to pick `fixed/small/slow/I` as you'll only need one item. Best practices would be to name it the same as your classes' name space and embed folder. This way anyone can look at the embeds folder and instantly figure out the appropriate name of the container. For example the Thrasher inside `embeds/coal-us` has classes called `.coal-us__*` and requires a container called `coal-us`.

### Getting the snapURL

To embed the Thrasher you'll need to get the snapURL. This is a URL that contains the path to your `source.json` file and fallback information for while the snap is loading or if it fails. By running either `grunt local --folderName=the-name-of-your-embed` or `grunt remote --folderName=the-name-of-your-embed` commands, the terminal will return both local and remote snapURLs. If you wish to get these URLs without having to watch, compile and deploy, use
```
grunt paths --folderName=the-name-of-your-embed
```

If any of the fallback information has changed since you first ran `grunt new`, you can update those values using
```
grunt update --folderName=the-name-of-your-embed
```

### Embedding the Thrasher

The appropriate snapURL then needs to be added to your container using the [Facia Fronts Tool](https://fronts.code.dev-gutools.co.uk/editorial?front=thrashers). You'll need drag it in as an active link onto the clipboard, the result of which then needs to be dragged to the appropriate container.

You should now see your thrasher at the bottom of the [Thrasher front](http://m.code.dev-theguardian.com/thrashers) on `CODE`.
