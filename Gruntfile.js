module.exports = function(grunt) {

	var now = new Date();
	// 年
	var version = now.getFullYear().toString();
	// 月
	var month = now.getMonth() + 1;
	if (month < 10) {
		version += '0';
	}
	version += month.toString();
	// 日
	if (now.getDate() < 10) {
		version += '0';
	}
	version += now.getDate().toString();
	// 時
	if (now.getHours() < 10) {
		version += '0';
	}
	version += now.getHours().toString();
	// 分
	if (now.getMinutes() < 10) {
		version += '0';
	}
	version += now.getMinutes().toString();

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			release: {
				files: [
					{expand: true, cwd: '<%= pkg.devroot %>', src: ['*.png'], dest: '<%= pkg.relroot %>'},
					{expand: true, cwd: '<%= pkg.devroot %>/images/', src: ['*.png'], dest: '<%= pkg.relroot %>/images/'}
				]
			}
		},
		clean: {
			release: {
				src: [
					'<%= pkg.relroot %>/app.min.js',
					'<%= pkg.relroot %>/*.png',
					'<%= pkg.relroot %>/images/*.png'
				]
			}
		},
		uglify: {
			release: {
				files: {
					'<%= pkg.uglified %>': '<%= pkg.sourceFiles %>'
				}
			}
		},
		compress: {
			release: {
				options: {
					archive: '<%= pkg.name %>_' + version + '.zip'
				},
				files: [
						{expand: true, cwd: '<%= pkg.relroot %>', src: ['app.min.js'], dest: './'},
						{expand: true, cwd: '<%= pkg.relroot %>', src: ['index.html'], dest: './'},
						{expand: true, cwd: '<%= pkg.relroot %>', src: ['*.png'], dest: './'},
						{expand: true, cwd: '<%= pkg.relroot %>', src: ['images/*.png'], dest: './'},
					]
				}
			}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('release', ['copy:release', 'uglify', 'compress']);
	grunt.registerTask('default', 'release');

};
