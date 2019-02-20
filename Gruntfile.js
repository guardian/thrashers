module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    if (grunt.file.exists('aws-keys.json')) {
      var aws = grunt.file.readJSON('aws-keys.json');
      var awsOptions = {
          accessKeyId: aws.AWSAccessKeyID,
          secretAccessKey: aws.AWSSecretKey,
          region: 'us-east-1'
      };
    } else {
      var awsOptions = {
          awsProfile: 'interactives',
          region: 'us-east-1'
      };
    }

    var newDir = grunt.option('folderName');
    var dir =  'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') : '');
    var scss = 'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') + '/*.scss' : '**/*.scss');
    var html = 'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') + '/*.html' : '**/*.html');
    var source = 'embeds/' + (grunt.option('folderName') ? grunt.option('folderName')+ '/_source/*' : '**/source/*');
    var remoteDir = 'thrashers/' + (grunt.option('folderName') ? grunt.option('folderName') : '');

    var videoMaxAssetSize = 1 * 1000 * 1000; //1MB
    var imageMaxAssetSize = 300 * 1000; //200kb
    var maxGifSize = 5000 * 1000; //1MB, which should be enough for a tracking pixel

    try {
        grunt.initConfig({
            maxFilesize: {
                videos: {
                    options: {
                        maxBytes: videoMaxAssetSize
                    },
                    src: [source + '.mp4', source + '.mov']
                },
                images: {
                    options: {
                        maxBytes: imageMaxAssetSize
                    },
                    src: [source + '.jpg', source + '.jpeg', source + '.png']
                },
                gif: {
                    options: {
                        maxBytes: maxGifSize
                    },
                    src: [source + '.gif']
                }
            },
            watch: {
                local: {
                    files: [scss, html, source],
                    tasks: ['update-local']
                },
                remote: {
                    files: [scss, html, source],
                    tasks: ['update-remote']
                }
            },
            sass: {
                dist: {
                    options: {
                        style: 'compressed'
                    },
                    files: [{
                        expand: true,
                        cwd: dir,
                        src: '**/*.scss',
                        dest: dir,
                        ext: '.css'
                    }]
                }
            },
            autoprefixer: {
                dist: {
                    files: [{
                        expand: true,
                        cwd: dir,
                        src: 'style.css',
                        dest: dir
                    }]
                }
            },
            cssmin: {
                target: {
                    files: [{
                        expand: true,
                        cwd: dir,
                        src: '*.css',
                        dest: dir
                    }]
                }
            },
            replace: {
                local: {
                    options: {
                        patterns: [{
                            match: /@@assetPath@@/g,
                            replacement: 'https://localhost:8000/' + dir + '/hashed'
                        }]
                    },
                    files: [{
                        expand: true,
                        cwd: dir,
                        src: ['**/source.json', '**/hashed/*.js'],
                        dest: dir,
                    }]
                },
                remote: {
                    options: {
                        patterns: [{
                            match: /@@assetPath@@/g,
                            replacement: 'https://interactive.guim.co.uk/' + remoteDir + '/hashed'
                        }]
                    },
                    files: [{
                        expand: true,
                        cwd: dir,
                        src: '**/source.json',
                        dest: dir
                    }]
                }
            },
            connect: {
                server: {
                    options: {
                        protocol: 'https',
                        key: grunt.file.read('./certs/localhost-key.pem'),
                        cert: grunt.file.read('./certs/localhost.pem'),
                        ca: grunt.file.read('./certs/rootCA.pem'),
                        middleware: function (connect, options, middlewares) {
                            middlewares.unshift(function (req, res, next) {
                                res.setHeader('Access-Control-Allow-Origin', '*');
                                res.setHeader('Access-Control-Allow-Methods', '*');
                                return next();
                            });
                            return middlewares;
                        }
                    }
                }
            },
            aws_s3: {
                options: awsOptions,
                production: {
                    options: {
                        bucket: 'gdn-cdn',
                    },
                    files: [{
                        expand: true,
                        cwd: dir,
                        src: ['**/source.json'],
                        dest: remoteDir,
                        params: {
                            CacheControl: 'max-age=60'
                        }
                    },{
                        expand: true,
                        cwd: dir,
                        src: ['**/hashed/*'],
                        dest: remoteDir,
                        params: {
                            CacheControl: 'max-age=2678400'
                        }
                    }]
                }
            },
            hash: {
                options: {
                    mapping: dir + '/hashmap.json',
                    flatten: true
                },
                source: {
                    src: dir + '/_source/*',
                    dest: dir + '/hashed/'
                }
            },
            copy: {
                main: {
                    files: [{
                        expand: true,
                        flatten: true,
                        src: ['template/*'],
                        dest: 'embeds/' + newDir
                    }]
                }
            },
            prompt: {
                input: {
                    options: {
                        questions: [
                            {
                                config: 'snap.url',
                                type: 'input',
                                message: 'Fallback URL',
                                default: 'https://www.theguardian.com'
                            },
                            {
                                config: 'snap.headline',
                                type: 'input',
                                message: 'Headline',
                                default: 'The Guardian'
                            },
                            {
                                config: 'snap.trailText',
                                type: 'input',
                                message: 'Trail Text',
                                default: 'Latest news, sport and comment from the Guardian'
                            }
                        ]
                    }
                },
                appConfig: {
                    options: {
                        questions: [
                            {
                                config: 'appConfig.image',
                                type: 'input',
                                default: defaultFromObject("image", null),
                                message: 'OPTIONAL: '['red'].bold + 'Image URL (leave blank to use the default card image)'
                            },
                            {
                                config: 'appConfig.tabletImage',
                                type: 'input',
                                default: defaultFromObject("tabletImage", null),
                                message: 'OPTIONAL: '['red'].bold + 'Image URL for tablets only (leave blank to fallback on image or card image)'
                            },
                            {
                                config: 'appConfig.url',
                                type: 'input',
                                default: defaultFromObject("url", null),
                                message: 'OPTIONAL: '['red'].bold + 'URL override (leave blank to take user to default card)'
                            },
                            {
                                config: 'appConfig.title',
                                type: 'input',
                                default: defaultFromObject("title", null),
                                message: 'OPTIONAL: '['red'].bold + 'Thrasher title (leave blank to use the default card title)'
                            },
                            {
                                config: 'appConfig.titleFont',
                                type: 'list',
                                default: defaultFromObject("titleFont", 'egypt-regular'),
                                message: 'Thrasher title typeface',
                                choices: [
                                    { name:'DE1 Display Egyptian Thin', value: 'egypt-thin' },
                                    { name:'DE2 Display Egyptian Light', value: 'egypt-light' },
                                    { name:'DE3 Display Egyptian Regular', value: 'egypt-regular'},
                                    { name:'DE4 Display Egyptian Medium', value: 'egypt-medium' },
                                    { name:'DE6 Display Egyptian Bold', value: 'egypt-bold' },
                                    '---',
                                    { name:'Agate Regular', value: 'agate-regular' },
                                    { name:'Agate Bold', value: 'agate-bold' },
                                    '---',
                                    { name:'Display Sans', value: 'display-sans' },
                                    '---'
                                ]
                            },
                            {
                                config: 'appConfig.titleSize',
                                type: 'input',
                                default: defaultFromObject("titleSize", null),
                                message: 'OPTIONAL: '['red'].bold + 'Thrasher title size (in density independent pixels)',
                                validate: validateInputSize,
                                filter: sizeAsInt
                            },
                            {
                                config: 'appConfig.titleColour',
                                type: 'input',
                                default: defaultFromObject("titleColour", 'FFFFFF'),
                                message: 'OPTIONAL: '['red'].bold + 'Thrasher title text colour (default white)' + ' RGB'['red'].bold,
                                validate: validateInputColour,
                                filter: hexToColour
                            },
                            {
                                config: 'appConfig.trail',
                                type: 'input',
                                default: defaultFromObject("trail", null),
                                message: 'OPTIONAL: '['red'].bold + 'Trail text (blank to hide)',
                                when: defaultLayout
                            },
                            {
                                config: 'appConfig.trailFont',
                                type: 'list',
                                default: defaultFromObject("trailFont", 'egypt-regular'),
                                message: 'Trail typeface',
                                choices: [
                                    { name:'DE1 Display Egyptian Thin', value: 'egypt-thin' },
                                    { name:'DE2 Display Egyptian Light', value: 'egypt-light' },
                                    { name:'DE3 Display Egyptian Regular', value: 'egypt-regular'},
                                    { name:'DE4 Display Egyptian Medium', value: 'egypt-medium' },
                                    { name:'DE6 Display Egyptian Bold', value: 'egypt-bold' },
                                    '---',
                                    { name:'Agate Regular', value: 'agate-regular' },
                                    { name:'Agate Bold', value: 'agate-bold' },
                                    '---',
                                    { name:'Display Sans', value: 'display-sans' },
                                    '---'
                                ],
                                when: function() { return grunt.config('appConfig.trail') != null }
                            },
                            {
                                config: 'appConfig.trailSize',
                                type: 'input',
                                default: defaultFromObject("trailSize", null),
                                message: 'OPTIONAL: '['red'].bold + 'Trail text size (in density independent pixels)',
                                validate: validateInputSize,
                                filter: sizeAsInt,
                                when: function() { return grunt.config('appConfig.trail') != null }
                            },
                            {
                                config: 'appConfig.trailColour',
                                type: 'input',
                                default: defaultFromObject("trailColour", 'FFFFFF'),
                                message: 'OPTIONAL: '['red'].bold + 'Trail text colour (default white)' + ' RGB'['red'].bold,
                                validate: validateInputColour,
                                filter: hexToColour,
                                when: function() { return grunt.config('appConfig.trail') != null }
                            },
                            {
                                config: 'appConfig.kickerHide',
                                type: 'confirm',
                                default: defaultFromObject("kickerHide", false),
                                message: 'Hide kicker',
                                when: defaultLayout
                            },
                            {
                                config: 'appConfig.kicker',
                                type: 'input',
                                default: defaultFromObject("kicker", null),
                                message: 'OPTIONAL: '['red'].bold + 'Kicker text (leave blank to use default card section)',
                                when: function() { !grunt.config('appConfig.kickerHide') }
                            },
                            {
                                config: 'appConfig.kickerColour',
                                type: 'input',
                                default: defaultFromObject("kickerColour", null),
                                message: 'OPTIONAL: '['red'].bold + 'Kicker text colour (leave blank to use default)' + ' RGB'['red'].bold,
                                validate: validateInputColour,
                                filter: hexToColour,
                                when: function() { !grunt.config('appConfig.kickerHide') }
                            },
                            {
                                config: 'appConfig.kickerFont',
                                type: 'list',
                                default: defaultFromObject("kickerFont", 'egypt-regular'),
                                message: 'Kicker typeface',
                                choices: [
                                    { name:'DE1 Display Egyptian Thin', value: 'egypt-thin' },
                                    { name:'DE2 Display Egyptian Light', value: 'egypt-light' },
                                    { name:'DE3 Display Egyptian Regular', value: 'egypt-regular'},
                                    { name:'DE4 Display Egyptian Medium', value: 'egypt-medium' },
                                    { name:'DE6 Display Egyptian Bold', value: 'egypt-bold' },
                                    '---',
                                    { name:'Agate Regular', value: 'agate-regular' },
                                    { name:'Agate Bold', value: 'agate-bold' },
                                    '---',
                                    { name:'Display Sans', value: 'display-sans' },
                                    '---'
                                ],
                                when: function() { !grunt.config('appConfig.kickerHide') }
                            },
                            {
                                config: 'appConfig.kickerSize',
                                type: 'input',
                                default: defaultFromObject("kickerSize", null),
                                message: 'OPTIONAL: '['red'].bold + 'Kicker text size (in density independent pixels)',
                                validate: validateInputSize,
                                filter: sizeAsInt,
                                when: function() { !grunt.config('appConfig.kickerHide') }
                            },
                            {
                                config: 'appConfig.hideGuardianRoundel',
                                type: 'confirm',
                                default: defaultFromObject("hideGuardianRoundel", false),
                                message: 'Hide Guardian Roundel',
                                when: defaultLayout
                            },
                            {
                                config: 'appConfig.buttonText',
                                type: 'input',
                                default: defaultFromObject("buttonText", null),
                                message: 'OPTIONAL: '['red'].bold + 'Button text (default "View Now")',
                                when: defaultLayout
                            },
                            {
                                config: 'appConfig.buttonBackgroundColour',
                                type: 'input',
                                default: defaultFromObject("buttonBackgroundColour", null),
                                message: 'OPTIONAL: '['red'].bold + 'Button '+'BACKGROUND'['blue'].bold+' colour' + ' RGB'['red'].bold,
                                validate: validateInputColour,
                                filter: hexToColour,
                                when: defaultLayout
                            },
                            {
                                config: 'appConfig.buttonTextColour',
                                type: 'input',
                                default: defaultFromObject("buttonTextColour", null),
                                message: 'OPTIONAL: '['red'].bold + 'Button '+'TEXT'['blue'].bold+' colour' + ' RGB'['red'].bold,
                                validate: validateInputColour,
                                filter: hexToColour,
                                when: defaultLayout
                            },
                            {
                                config: 'appConfig.imageGradient',
                                type: 'confirm',
                                default: defaultFromObject("imageGradient", false),
                                message: 'Add client side gradient (improve text contrast)'
                            },
                            {
                                config: 'appConfig.html',
                                type: 'list',
                                default: false,
                                message: 'Use HTML, CSS and JavaScript on apps?'['red'].bold,
                                choices: [
                                    { name:'Use fallback image on apps', value: "" },
                                    { name:'Use HTML, CSS and JavaScript on apps', value: defaultFromObject("html", "") }
                                ]
                            }
                        ],
                        then: function() { grunt.task.run('confirmAppConfig'); }
                    }
                },
                appConfigLayouts: {
                    options: {
                        questions: [
                            {
                                config: 'appConfig.layout',
                                type: 'list',
                                default: defaultFromObject("layout", 'default'),
                                message: 'Which layout should this thrasher use? ' ['red'].bold + 'SEE GITHUB DOCS FOR EXAMPLES',
                                choices: [
                                    { name:'Layout 1: Default thrasher layout', value: 'default' },
                                    { name:'Layout 2: Headline, right aligned', value: 'headline-right-aligned' },
                                ]
                            }
                        ],
                        then: function() { grunt.task.run(['prompt:appConfig']); }
                    }
                },
                appConfigConfirm: {
                    options: {
                        questions: [
                            {
                                config: 'appConfig.confirm',
                                type: 'confirm',
                                default: false,
                                message: 'Do you wish to overwrite the app config?'
                            }
                        ]
                    }
                },
                appConfigRemote: {
                    options: {
                        questions: [
                            {
                                config: 'appConfig.remote',
                                type: 'confirm',
                                default: false,
                                message: 'Update thrasher config for apps?'
                            }
                        ]
                    }
                }
            }
        });
    } catch (e) {
        if (e.message.indexOf('/certs/localhost') > -1) {
            throw new Error('certificates not found, run `./setup-certs.sh` from root of the projects');
        }
        throw e;
    }

    grunt.registerTask('appConfigRemote', function() {
        if(grunt.file.expand({}, dir + '*').length != 1) {
            grunt.log.writeln('Skipping app configuration, rerun this command with the --folderName to change app config');
            grunt.config('appConfig.remote', false);
            return;
        }
        grunt.task.run('prompt:appConfigRemote');
    });

    grunt.registerTask('appConfig', function() {
        if(grunt.config('appConfig.remote') === false) {
            return;
        }

        // Overwrite header logger for nicer formatted output
        global['headerLogger'] = grunt.log.header;
        grunt.log.header = function() {};
        grunt.log.writeln('SEE GITHUB DOCUMENTATION FOR ILLUSTRATED EXAMPLES'['blue'].bold);
        grunt.task.run(['prompt:appConfigLayouts']);
    });

    grunt.registerTask('confirmAppConfig', function() {
        grunt.log.writeln('App config will be overwitten with:');
        grunt.log.writeln(JSON.stringify(getAppConfig(), null, 2));
        grunt.task.run(['prompt:appConfigConfirm', 'overwriteAppConfig']);
    });

    grunt.registerTask('overwriteAppConfig', function() {
        // reset header logger for all future tasks
        grunt.log.header = global['headerLogger'];

        var confirm = grunt.config('appConfig.confirm');
        if(!confirm) {
            grunt.log.writeln('File write aborted');
            return;
        }

        var jsonFile = dir + '/source.json';
        var project = grunt.file.readJSON(jsonFile);

        var app = getAppConfig();

        if (Object.keys(app).length === 0)
            delete project.app;
        else
            project.app = app;

        grunt.file.write(jsonFile, JSON.stringify(project, null, 2));
        grunt.log.writeln('File: '['red'].bold + jsonFile['blue'].bold + " updated");
    });

    function defaultFromObject(key, defaultVal) {
        var path = dir + '/source.json';
        if(!grunt.file.exists(path)) {
            return defaultVal;
        }

        var object = grunt.file.readJSON(path);
        var app = object.app;

        if (app && app[key]) {
            return app[key];
        } else if (key === 'html') {
            return object[key];
        }
        return defaultVal;
    }

    function defaultLayout() {
        return grunt.config('appConfig.layout') == "default"
    }

    function getAppConfig() {
        var layout = grunt.config('appConfig.layout');
        var title = grunt.config('appConfig.title');
        var titleFont = grunt.config('appConfig.titleFont');
        var titleSize = grunt.config('appConfig.titleSize');
        var titleColour= grunt.config('appConfig.titleColour');
        var image = grunt.config('appConfig.image');
        var tabletImage = grunt.config('appConfig.tabletImage');
        var trail = grunt.config('appConfig.trail');
        var trailFont = grunt.config('appConfig.trailFont');
        var trailSize = grunt.config('appConfig.trailSize');
        var trailColour = grunt.config('appConfig.trailColour');
        var kicker = grunt.config('appConfig.kicker');
        var kickerColour = grunt.config('appConfig.kickerColour');
        var kickerHide = grunt.config('appConfig.kickerHide');
        var kickerFont = grunt.config('appConfig.kickerFont');
        var kickerSize = grunt.config('appConfig.kickerSize');
        var url   = grunt.config('appConfig.url');
        var buttonText = grunt.config('appConfig.buttonText');
        var buttonBackgroundColour = grunt.config('appConfig.buttonBackgroundColour');
        var buttonTextColour = grunt.config('appConfig.buttonTextColour');
        var hideGuardianRoundel = grunt.config('appConfig.hideGuardianRoundel');
        var imageGradient = grunt.config('appConfig.imageGradient');
        var html = grunt.config('appConfig.html');

        var app = {};
        if (layout) app.layout = layout;
        if (title) app.title = title;
        if (titleFont) app.titleFont = titleFont;
        if (titleSize) app.titleSize = titleSize;
        if (titleColour) app.titleColour = titleColour;
        if (image) app.image = image;
        if (tabletImage) app.tabletImage = tabletImage;
        if (trail) app.trail = trail;
        if (trailFont) app.trailFont = trailFont;
        if (trailSize) app.trailSize = trailSize;
        if (trailColour) app.trailColour = trailColour;
        if (buttonText) app.buttonText = buttonText;
        if (buttonTextColour) app.buttonTextColour = buttonTextColour;
        if (buttonBackgroundColour) app.buttonBackgroundColour = buttonBackgroundColour;
        app.hideKicker = kickerHide;
        if(!kickerHide) {
            if(kicker) app.kicker = kicker;
            if(kickerColour) app.kickerColour = kickerColour;
            if(kickerFont) app.kickerFont = kickerFont;
            if(kickerSize) app.kickerSize = kickerSize;
        }
        if(hideGuardianRoundel) app.hideGuardianRoundel = hideGuardianRoundel;
        if (url) app.url = url;
        if (imageGradient) app.imageGradient = imageGradient;
        app.html = html;

        return app;
    }

    function validateInputSize(val) {
        var number = Number(val);
        if(val.length != 0 && (isNaN(number) || val.toString().length != val.length)) {
            return "Invalid font size, must be a valid integer (eg, 15)";
        }
        return true;
    }

    function sizeAsInt(input) {
        return Number(input);
    }

    function hexToColour(input) {
        if(input.charAt(0) == '#') {
            return input;
        }
        return "#" + input;
    }

    function validateInputColour(val) {
        if(val.length > 0 && (val.length != 6 || !val.match(/[0-9a-fA-F]{6}/))) {
            if(val.length == 7 && val.match(/#[0-9a-fA-F]{6}/)) {
                return true;
            }
            return "Invalid colour, should be in RBG hex format (eg FF0000 for pure red)";
        }
        return true;
    }

    grunt.registerTask('compile', function() {
        grunt.file.expand({}, dir + '*').forEach(function(path) {
            var html = grunt.file.read(path + '/index.html');
            var css = grunt.file.read(path + '/style.css');
            var jsonFile = path + '/source.json';
            var localDir = path.split('/')[1];
            var project = grunt.file.readJSON(jsonFile);
            if (grunt.file.exists(path + '/hashmap.json')) {
                var hashedMap = grunt.file.readJSON(path + '/hashmap.json');
            }

            project['html'] = '<div class="' + localDir + '__wrapper">' + '<style>' + css + '</style>' + html + '</div>';

            grunt.file.expand({}, dir + '/_source/*').forEach(function(file) {
                file = file.split("/");
                file = file[file.length-1];
                project['html'] = project['html'].replace(RegExp(file, "g"), hashedMap[file]);
            });

            grunt.file.write(jsonFile, JSON.stringify(project, null, 2));
        });
    });

    grunt.registerTask('update-local', ['sass', 'autoprefixer', 'cssmin', 'hash', 'compile', 'replace:local']);
    grunt.registerTask('update-remote', ['sass', 'autoprefixer', 'cssmin', 'hash', 'compile', 'replace:remote', 'aws_s3']);

    grunt.registerTask('write-paths', function() {
        var snap = grunt.config('snap');
        var jsonFile = dir + '/source.json';
        var project = grunt.file.readJSON(jsonFile);

        for(var key in snap) {
            project[key] = snap[key];
        }
        grunt.file.write(jsonFile, JSON.stringify(project, null, 2));
    });

    grunt.registerTask('return-paths', function() {
        if (grunt.option('folderName')) {
            var project = grunt.file.readJSON(dir + '/source.json');
            var s3Path = 'https://interactive.guim.co.uk/' + remoteDir + '/source.json';
            var localPath = 'https://localhost:8000/' + dir + '/source.json';

            function returnSnapPath(location) {
                return project.url + '?gu-snapType=json.html&gu-snapUri=' + encodeURIComponent(location) + '&gu-headline=' + encodeURIComponent(project.headline) + '&gu-trailText=' + encodeURIComponent(project.trailText);
            }

            grunt.log.writeln('Local Path: '['red'].bold + returnSnapPath(localPath));
            grunt.log.writeln('S3 Path: '['yellow'].bold + s3Path);
            grunt.log.writeln('Snap Path: '['green'].bold + returnSnapPath(s3Path));
        }
    });

    grunt.registerTask('new', ['copy', 'prompt:input', 'write-paths', 'return-paths']);
    grunt.registerTask('update', ['prompt:input', 'write-paths']);
    grunt.registerTask('default', ['sass', 'compile']);
    grunt.registerTask('local', ['connect', 'return-paths', 'maxFilesize', 'update-local', 'watch:local']);
    grunt.registerTask('remote', ['appConfigRemote', 'appConfig', 'return-paths', 'maxFilesize', 'update-remote', 'watch:remote']);
    grunt.registerTask('paths', ['return-paths']);
};
