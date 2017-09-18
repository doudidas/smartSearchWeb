'use strict';
/* global $*/

/**
 * @ngdoc function
 * @name smartSearchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smartSearchApp
 */
 var ipEngine   = process.env.ip_adress_engine;

angular.module('smartSearchApp').controller('MainCtrl', function($scope, $http, $routeParams) {
   $('html,body').animate({
      scrollTop: $("body").offset().top
   }, 'slow');
   $http.defaults.headers.post['Content-Type'] = 'application/json';
   var id = $routeParams.id;
   if (!id) {
      $http({
         method: 'GET',
         crossDomain: true,
         url: "http://"+ipEngine+"/api/destination/random",
      }).then(
         function(success) {
            $scope.cities = success.data.retval._batch;
         });
   } else {
      $http({
         method: 'GET',
         crossDomain: true,
         url: "http://"+ipEngine+"/api/destination/" + id,
      }).then(
         function(success) {
            $scope.city = success.data;
         });
   }

});
