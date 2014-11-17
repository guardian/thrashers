 module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-aws-s3');

  var dir =  'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') : '');
  var scss = 'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') + '/*.scss' : '**/*.scss');
  var html = 'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') + '/*.html' : '**/**/*.html'); 
  var newDir = grunt.option('name');
  var aws = grunt.file.readJSON('aws-keys.json');

  console.log(aws.AWSAccessKeyID);

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
           src: ['**/*.json', '**/*.png'],
           dest: 'thrashers/'
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
    }
  });

  grunt.registerTask('compile', function() {
      grunt.file.expand({}, dir + '*').forEach(function(path) {
        var html = grunt.file.read(path + "/index.html");
        var css = grunt.file.read(path + "/style.css");
        var jsonFile = path + "/source.json";
        var localDir = path.split('/')[1];
        console.log(jsonFile);
        var project = grunt.file.readJSON(jsonFile);
        
        project["html"] = '<div class="'+ localDir +'__wrapper">' + '<style>' + css + '</style>' + html + '</div>';
        grunt.file.write(jsonFile, JSON.stringify(project, null, 2));
      });
  });

  grunt.registerTask('new', ['copy']);
  grunt.registerTask('default', ['sass', 'compile']);
  grunt.registerTask('local', ['watch:local']);
  grunt.registerTask('remote', ['watch:remote']);
};