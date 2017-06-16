'use strict';

/**
 * @ngdoc overview
 * @name smartSearchApp
 * @description
 * # smartSearchApp
 *
 * Main module of the application.
 */
angular
  .module('smartSearchApp', ['ngResource', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/loading', {
        templateUrl: 'views/loading.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/form', {
        templateUrl: 'views/form/form.html',
        controller: 'FormCtrl',
        controllerAs: 'form'
      })
      .when('/ok', {
        templateUrl: 'views/return_ok.html',
        controller: 'FormCtrl',
        controllerAs: 'form'
      })
      .when('/ko', {
        templateUrl: 'views/return_ko.html',
        controller: 'FormCtrl',
        controllerAs: 'form'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
