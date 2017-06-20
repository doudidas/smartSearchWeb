'use strict';
/**
 * @ngdoc function
 * @name smartSearchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smartSearchApp
 */
angular.module('smartSearchApp').controller('MainCtrl', function($scope, $http,$routeParams) {
   $http.defaults.headers.post['Content-Type'] = 'application/json';
var id = $routeParams.id;
 if (!id) {
    $http({
     method: 'GET',
     crossDomain: true,
     url: 'http://localhost:8080/api/destination/',
    }).then(
     function(success) {
         $scope.cities = success.data;
     });
 } else {
    $http({
     method: 'GET',
     crossDomain: true,
     url: 'http://localhost:8080/api/destination/'+id,
    }).then(
     function(success) {
         $scope.city = success.data;
     });
}

});
