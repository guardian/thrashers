 module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  var dir =  'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') : '');
  var scss = 'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') + '/*.scss' : '**/*.scss');
  var html = 'embeds/' + (grunt.option('folderName') ? grunt.option('folderName') + '/*.html' : '**/**/*.html'); 
  var newDir = grunt.option('name');

  grunt.initConfig({
    watch: {
      css: {
        files: [scss, html],
        tasks: ['sass', 'compile']
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
    copy: {
      main: {
        files: [{
          expand: true,
          flatten: true,
          src: ['template/*.*'],
          dest: 'embeds/<%= vars.newDir %>'
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
        var project = grunt.file.readJSON(jsonFile);
        
        project["html"] = '<div class="'+ localDir +'__wrapper">' + '<style>' + css + '</style>' + html + '</div>';
        grunt.file.write(jsonFile, JSON.stringify(project, null, 2));
      });
  });

  grunt.registerTask('new', ['copy']);
  grunt.registerTask('default', ['sass', 'compile']);
};