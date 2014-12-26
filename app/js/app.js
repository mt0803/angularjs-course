'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.controllers',
  'myApp.financeService'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/angularIntro', {templateUrl: 'partials/angular_intro.html'});
  $routeProvider.when('/studyDataBind', {templateUrl: 'partials/studyDataBind.html'});
  $routeProvider.when('/studyEventBind', {templateUrl: 'partials/studyEventBind.html'});
  $routeProvider.when('/studyRoute', {templateUrl: 'partials/studyRoute.html'});
  $routeProvider.when('/studyFilter', {templateUrl: 'partials/studyFilter.html'});
  $routeProvider.when('/studyExecute', {templateUrl: 'partials/studyExecute.html'});
  $routeProvider.when('/studyScopeCommunication', {templateUrl: 'partials/studyScopeCommunication.html'});
  $routeProvider.when('/studyForm', {templateUrl: 'partials/studyForm.html'});
  $routeProvider.when('/studyDI', {templateUrl: 'partials/studyDI.html', controller: 'CheckboxCtrl'});
  $routeProvider.when('/studyDirective',{templateUrl:'partials/studyDirective.html'});
  $routeProvider.when('/studyService',{templateUrl:'partials/studyService.html'});
  $routeProvider.when('/studyXHRCall',{templateUrl:'partials/studyXHRCall.html'});
  $routeProvider.when('/myExperience',{templateUrl:'partials/myExperience.html'});
  $routeProvider.when('/knowledgeSource',{templateUrl:'partials/aboutKnowledgeSource.html'});
  $routeProvider.when('/aboutAuthor',{templateUrl:'partials/aboutAuthor.html'});
  $routeProvider.when('/angular_module_file_upload', {templateUrl: 'partials/angular_module_file_upload.html'})
  $routeProvider.otherwise({redirectTo: '/angularIntro'});
}]);