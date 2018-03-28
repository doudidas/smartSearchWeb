'use strict';
/* global $, Cookies */
angular.module('smartSearchApp').controller('ResultCtrl', function($scope, $routeParams, $http) {
    var ipEngine = 'backend.lab.local:9000';

   $('html,body').animate({
      scrollTop: $('body').offset().top
   }, 'slow');
   var userToken;

   if (!$routeParams.id) {
      userToken = Cookies.get('token');
   } else {
      userToken = $routeParams.id;
   }
   $http.defaults.headers.post['Content-Type'] = 'application/json';

   $http({
      method: 'GET',
      crossDomain: true,
      url: 'http://'+ ipEngine + '/api/destination/user/' + userToken,
   }).then(
      function(success) {
         $scope.user = success.data[0];
         $scope.cities = success.data[1];
         if ($scope.cities.length === 0) {
            $('.noResult').fadeIn().removeClass('hidden');
         }
      },
      function(error) {
         $('html,body').animate({
            scrollTop: $('#blue').offset().top
         }, 'slow');
         var content;
         $scope.serverResponse = error;
         if (error.status === -1) {
            content = 'Service indisponible : le serveur le répond pas...';
         } else {
            content = 'Erreur du serveur';
         }
         $('.alert-warning').fadeIn().removeClass('hidden').delay(3000).fadeOut('slow');
         $scope.warningMessage = content;
         $scope.error = true;
      });
});
