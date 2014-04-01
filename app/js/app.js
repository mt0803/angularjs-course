'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.controllers',
  'myApp.financeService'

]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/angularIntro', {templateUrl: 'partials/angular_intro.html',controller: 'angularIntroCtrl'});
  $routeProvider.when('/studyDataBind', {templateUrl: 'partials/studyDataBind.html'});
  $routeProvider.when('/studyEventBind', {templateUrl: 'partials/studyEventBind.html'});
  $routeProvider.when('/studyRoute', {templateUrl: 'partials/studyRoute.html'});
  $routeProvider.when('/studyFilter', {templateUrl: 'partials/studyFilter.html'});
  $routeProvider.when('/studyExecute', {templateUrl: 'partials/studyExecute.html'});
  $routeProvider.when('/view7', {templateUrl: 'partials/partial_scope.html', controller: 'TimeCtrl'});
  $routeProvider.when('/view8', {templateUrl: 'partials/partial_controllerExt.html', controller: 'MainCtrl'});
  $routeProvider.when('/view9', {templateUrl: 'partials/partial_select.html', controller: 'CheckboxCtrl'});
  $routeProvider.when('/angularTree',{templateUrl:'partials/angularTree.html',controller:'treeCtrl'});
  $routeProvider.otherwise({redirectTo: '/angularIntro'});
}]);