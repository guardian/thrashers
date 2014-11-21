module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-aws-s3');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-prompt');
    grunt.loadNpmTasks('grunt-sass');

    var aws = grunt.file.readJSON('aws-keys.json');
    var newDir = grunt.option('name');
    var dir =  'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') : '');
    var scss = 'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') + '/*.scss' : '**/*.scss');
    var html = 'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') + '/*.html' : '**/*.html');
    var remoteDir = 'thrashers/' + (grunt.option('folderName') ? grunt.option('folderName') : '');

    grunt.initConfig({
        watch: {
            local: {
                files: [scss, html],
                tasks: ['sass', 'compile']
            },
            remote: {
                files: [scss, html],
                tasks: ['sass', 'compile', 'aws_s3']
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
        connect: {
            server: {
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
                    params: {
                        CacheControl: 'max-age=60'
                    }
                },
                files: [{
                    expand: true,
                    cwd: dir,
                    src: ['**/*.json', '**/source/*'],
                    dest: remoteDir
                }]
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['template/*.*'],
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
                            default: 'www.theguardian.com'
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

            project['html'] = '<div class="' + localDir + '__wrapper">' + '<style>' + css + '</style>' + html + '</div>';
            grunt.file.write(jsonFile, JSON.stringify(project, null, 2));
        });
    });

    grunt.registerTask('return-paths', function() {
        var snap = grunt.config('snap');
        var s3Path = 'http://interactive.guim.co.uk/' + remoteDir + '/source.json';
        var localPath = 'http://localhost:8000/' + dir + '/source.json';
        var snapPath = snap.url + '?gu-snapType=json.html&gu-snapUri=' + encodeURIComponent(s3Path) + '&gu-headline=' + encodeURIComponent(snap.headline) + '&gu-trailText=' + encodeURIComponent(snap.trailText);
        
        // Add snapPathLocal variable and output it

        grunt.log.writeln('S3 Path: '['yellow'].bold + s3Path);
        grunt.log.writeln('Snap Path: '['green'].bold + snapPath);
    });

    grunt.registerTask('new', ['copy']);
    grunt.registerTask('default', ['sass', 'compile']);
    grunt.registerTask('local', ['connect', 'watch:local']);
    grunt.registerTask('remote', ['watch:remote']);
    grunt.registerTask('paths', ['prompt:input', 'return-paths']);
};