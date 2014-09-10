/*global module */
module.exports = function (grunt) {
  grunt.loadNpmTasks('tempo-scenario');

  // configuration for scenarios
  grunt.initConfig({
    scenarios: {
      myApp: {
        src: 'mocks',
        dest: 'mocks/scenarioData.js',
        baseURL: 'http://wongatech.github.io/tempo-scenario/'
      }
    }
  });
};
