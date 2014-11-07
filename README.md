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

To create a new project use
```
grunt copy --name=the-name-of-your-embed
```

This will create a copy of the template inside `\embeds`.

Then `cd` into that folder and run the follow command to watch for changes and compile the json file.

```
sh compile.sh
```
