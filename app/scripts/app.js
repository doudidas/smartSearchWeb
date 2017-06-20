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
  .config(function($routeProvider) {
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
      .when('/result/:id', {
        templateUrl: 'views/result.html',
        controller: 'ResultCtrl',
        controllerAs: 'result'
      })
      .when('/result', {
        templateUrl: 'views/result.html',
        controller: 'ResultCtrl',
        controllerAs: 'result'
      })
      .when('/city/:id', {
        templateUrl: 'views/city.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
