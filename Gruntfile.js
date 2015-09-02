module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			all:{
				options:{
					port: 9000,
					hostname:"0.0.0.0",
					keepalive: true,
				}
			}
		},

		open:{
			all:{
				path: 'http://localhost:9000',
				app: 'chrome'
			}
		},

		watch:{
			src:{
				options:{
					livereload: true
				},
				files: [
					'*.html'
				],
			}
		},
	});
	
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-open');	
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('server', [
		'open',
		'connect',
		'watch'
	]);

};