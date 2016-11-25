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

To run remotely, you'll need to access to Interactives Prod via Janus. With Janus credentials pasted in terminal, run
```
grunt remote --folderName=the-name-of-your-embed
```

To compile and deploy *everything* run the above commands without the `--folderName` option. **WARNING: This should be done with caution, as it might take a while to compile all Thrashers**

### Creating the container

To preview your Thrasher on the site it will need to be added to a front with it's own container. For development and archival reasons, add it to the bottom of the [Thrasher front](http://m.code.dev-theguardian.com/thrashers) on `CODE`. Or add it to the bottom of the [Ben Thrasher front](http://m.code.dev-theguardian.com/benthrasher) on `CODE`.

The first thing that you'll need to do is create a new container with the name of the thrasher in the Facia Fronts Config tool [Fascia fronts config](https://fronts.code.dev-gutools.co.uk/editorial/config). Make sure to pick `fixed/thrasher` as you'll only need one item. Best practices would be to name it the same as your classes' name space and embed folder. This way anyone can look at the embeds folder and instantly figure out the appropriate name of the container. For example the Thrasher inside `embeds/coal-us` has classes called `.coal-us__*` and requires a container called `coal-us`.

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

The appropriate snapURL then needs to be added to your container using the [Facia Fronts Tool](https://fronts.code.dev-gutools.co.uk/editorial?front=thrashers). You'll need drag it in as an active link onto the clipboard, the result of which then needs to be dragged to the appropriate container. Remember to choose benthrasher from the pull down if you want it to appear on that page.

You should now see your thrasher at the bottom of the [Thrasher front](http://m.code.dev-theguardian.com/thrashers) on `CODE`.

OR IF YOU USED benthrasher you should now see your thrasher at the bottom of the [Ben Thrasher front](http://m.code.dev-theguardian.com/benthrasher) on `CODE`.

## Developing

### Breakpoints

The way thrashers are injected into the page means you'll be inheriting all of [`frontend's`](http://github.com/guardian/frontend) styles. As a result it's best to stick to the same breakpoints. The templates come, by default, with [`sass-mq`](http://github.com/sass-mq/sass-mq) and a copy of `frontend's` breakpoints. Which should be used like this.

```scss
.coal-us__title {
    font-size: 24px;

    @include mq(tablet) {
        font-size: 32px;
    }
);
```

### Assets

All additional assets should be placed into the `_source` folder. The script will then asset hash them and handle uploading. This, combined with the ability to develop locally and remotely means you'll have to reference the files differently to the way you normally would. If you use `@@assetPath@@` in your `html` or `scss`, the grunt script will replace this part of the path with whatever is appropriate.

```html
<img class="coal-us__logo" src="@@assetPath@@/logo.png" />
```

### Height

Due to the strong use of imagery and other components on the front. For this reason it's best practice to keep the height of a thrasher under `200px` on desktop and `400px` on mobile. These should be taken as max-heights and the smaller the better.

### Animations & transitions

Due to multiple reports of the site crashing on older devices (iPad 2s, older Android smartphones, etc...), it's best to keep animations and transitions to a minimum unless they add a lot of value.

### Javascript

Due to the way we inject the thrashers into `frontend` we can't add `<script>` tags in the html. These are stripped out. The work around we've come up with so far, is to have a 1x1px image with an onload event that adds a `<script>` tag.

```html
    <img
        style="height:0;width:0;visibility:hidden;position:absolute;z-index: 1;"
        height="0"
        width="0"
        src="@@assetPath@@/empty.gif"
        onload="var script=document.createElement('script');script.src='@@assetPath@@/main.js'; document.body.appendChild(script);"
    />
```

Although the same practice applies to javascript as it does for animations and transitions. There has to be a good reason for it to exist and they have to be incredibly light. It's also best not to require heavy libraries like `jQuery` to achieve the same results that could be done with vanilla javascript and/or micro-libraries.

### Apps

You'll be prompted to provide an app-specific config when running `grunt remote` with the `--folderName=` parameter. If you wish to update the app config without running grunt remote, you can run `grunt appConfig --folderName=<FOLDER>`

