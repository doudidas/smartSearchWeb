'use strict';
/* global FB, facebookService */
/**
 * @ngdoc function
 * @name smartSearchApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the smartSearchApp
 */
angular.module('smartSearchApp').factory('facebookService', function($q) {
    return {
      getMyLastName: function() {
        var deferred = $q.defer();
        FB.api('/me', {
          fields: 'last_name'
        }, function(response) {
          if (!response || response.error) {
            deferred.reject('Error occured');
          } else {
            deferred.resolve(response);
          }
        });
        return deferred.promise;
      }
   };
})
  .controller('MainCtrl', function($scope) {
     $scope.getMyLastName = function() {
        facebookService.getMyLastName()
          .then(function(response) {
             console.log(response);
            $scope.facebook = response.last_name;
          }
        );
     };


 });
