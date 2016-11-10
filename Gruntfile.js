module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    var newDir = grunt.option('folderName');
    var dir =  'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') : '');
    var scss = 'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') + '/*.scss' : '**/*.scss');
    var html = 'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') + '/*.html' : '**/*.html');
    var source = 'embeds/' + (grunt.option('folderName') ? grunt.option('folderName')+ '/_source/*' : '**/source/*');
    var remoteDir = 'embed/article-embeds/' + (grunt.option('folderName') ? grunt.option('folderName') : '');

    grunt.initConfig({
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
                    src: ['**/source.json', '**/embed.html', '**/boot.js', '**/hashed/*.js'],
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
                    src: ['**/source.json', '**/boot.js', '**/embed.html'],
                    dest: dir
                }]
            }
        },
        connect: {
            server: {
                options: {
                    protocol: 'https',
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
                awsProfile: 'interactivesProd',
                region: 'us-east-1'
            },
            production: {
                options: {
                    bucket: 'gdn-cdn',
                },
                files: [{
                    expand: true,
                    cwd: dir,
                    src: ['**/embed.html',  '**/style.css'],
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
            var embed = path + '/embed.html';
            var documentBody = '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>' + css + '</style></head><body>';
            if (grunt.file.exists(path + '/hashmap.json')) {
                var hashedMap = grunt.file.readJSON(path + '/hashmap.json');
            }

            project['html'] = '<div class="' + localDir + '__wrapper">' + '<style>' + css + '</style>' + html + '</div>';
            var embedHtml = documentBody + html + '<script src="//j.ophan.co.uk/interactive.js"></script></body></html>';
            grunt.file.expand({}, dir + '/_source/*').forEach(function(file) {
                file = file.split("/");
                file = file[file.length-1];
                project['html'] = project['html'].replace(RegExp(file, "g"), hashedMap[file]);
                embedHtml = embedHtml.replace(RegExp(file, "g"), hashedMap[file]);
            });

            grunt.file.write(jsonFile, JSON.stringify(project, null, 2));
            grunt.file.write(embed, embedHtml);
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
            var s3Path = 'https://interactive.guim.co.uk/' + remoteDir + '/embed.html';
            var cssPath = 'https://interactive.guim.co.uk/' + remoteDir + '/style.css';
            var localPath = 'https://localhost:8000/' + dir + '/embed.html';
            function returnSnapPath(location) {
                // return project.url + '?gu-snapType=json.html&gu-snapUri=' + encodeURIComponent(location) + '&gu-headline=' + encodeURIComponent(project.headline) + '&gu-trailText=' + encodeURIComponent(project.trailText);
                return project.url;
            }

            grunt.log.writeln('S3 Path: '['yellow'].bold + s3Path);
            grunt.log.writeln('css Path: '['blue'].bold + cssPath);
            grunt.log.writeln('localhost: '['red'].bold + localPath);
        }
    });

    grunt.registerTask('new', ['copy', 'prompt:input', 'write-paths', 'return-paths']);
    grunt.registerTask('update', ['prompt:input', 'write-paths']);
    grunt.registerTask('default', ['sass', 'compile']);
    grunt.registerTask('local', ['connect', 'return-paths', 'update-local', 'watch:local']);
    grunt.registerTask('remote', ['return-paths', 'update-remote', 'watch:remote']);
    grunt.registerTask('paths', ['return-paths']);
};
