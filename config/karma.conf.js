module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'app/lib/angular/angular.js',
      'app/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'app/js/**/*.js',
      'test/unit/**/*.js'
    ],

    exclude : [
      'app/lib/angular/angular-loader.js',
      'app/lib/angular/*.min.js',
      'app/lib/angular/angular-scenario.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine','commonjs'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-commonjs',
            'karma-coverage'
            ],
    reporters: ['progress', 'junit','coverage'],
    preprocessors: {
      'app/js/app.js':'coverage',
      'app/js/controller.js':'coverage',
      'app/js/directives.js':'coverage',
      'app/js/filters.js':'coverage',
      'app/js/services.js':'coverage'
    },
    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
    coverageReporter : {
      type:'html',
      dir:'coverage/'
    },
    reportSlowerThan: 500,
     colors: true,
     logLevel: config.LOG_INFO

})}
