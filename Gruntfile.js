module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.initConfig({
    vars: {
      dir: grunt.option('folderName')
    },
    watch: {
      css: {
        files: './style.scss',
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

  grunt.registerTask('default', ['sass', 'watch']);
};