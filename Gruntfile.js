module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    var aws = grunt.file.readJSON('aws-keys.json');
    var newDir = grunt.option('folderName');
    var dir =  'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') : '');
    var scss = 'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') + '/*.scss' : '**/*.scss');
    var html = 'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') + '/*.html' : '**/*.html');
    var source = 'embeds/' + (grunt.option('folderName') ? grunt.option('folderName')+ '/_source/*' : '**/source/*');
    var remoteDir = 'thrashers/' + (grunt.option('folderName') ? grunt.option('folderName') : '');

    grunt.initConfig({
        watch: {
            local: {
                files: [scss, html, source],
                tasks: ['sass', 'autoprefixer', 'cssmin', 'hash', 'compile', 'replace:local']
            },
            remote: {
                files: [scss, html, source],
                tasks: ['sass', 'autoprefixer', 'cssmin', 'hash', 'compile', 'replace:remote', 'aws_s3']
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
                        replacement: 'http://localhost:8000/' + dir + '/hashed'
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
            options: {
                accessKeyId: aws.AWSAccessKeyID,
                secretAccessKey: aws.AWSSecretKey,
                region: 'us-east-1'
            },
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
                            default: 'http://www.theguardian.com'
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
            }
        }
    });

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
            var s3Path = 'http://interactive.guim.co.uk/' + remoteDir + '/source.json';
            var localPath = 'http://localhost:8000/' + dir + '/source.json';

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
    grunt.registerTask('local', ['connect', 'return-paths', 'watch:local']);
    grunt.registerTask('remote', ['return-paths', 'watch:remote']);
    grunt.registerTask('paths', ['return-paths']);
};