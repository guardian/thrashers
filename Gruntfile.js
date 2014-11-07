module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.initConfig({
    vars: {
      dir: grunt.option('folderName')
    },
    watch: {
      css: {
        files: ['<%= vars.dir %>/*.scss', '<%= vars.dir %>/*.html'],
        tasks: ['sass']
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
            '<%= vars.dir %>/style.css' : '<%= vars.dir %>/style.scss'
        }
      }
    }
  });
  
  grunt.event.on('watch', function(action, filepath, target) {
    var dir = grunt.option('folderName');
    var html = grunt.file.read(dir + "/" + dir + ".html");
    var css = grunt.file.read(dir + "/style.css");
    var jsonFile = dir + "/" + dir + ".json";

    var project = grunt.file.readJSON(jsonFile);
    project["html"] = '<div class="'+ dir +'__wrapper">' +
                        '<style>' + css + '</style>' +
                        html +
                      '</div>';
    grunt.file.write(jsonFile, JSON.stringify(project, null, 2));
  });

  grunt.registerTask('default', ['sass', 'watch']);
};