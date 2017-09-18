'use strict';
/* global $, Cookies */
/**
 * @ngdoc function
 * @name smartSearchApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the smartSearchApp
 */

angular.module('smartSearchApp').controller('FormCtrl', function($scope, $http, $window) {
   $scope.user = {
      'topics': []
   };

   $('html,body').animate({
      scrollTop: $("body").offset().top
   }, 'slow');

   $http({
      method: 'GET',
      crossDomain: true,
      url: 'http://0.0.0.0:8080/api/topic',
   }).then(
      function(success) {
         $scope.topics = success.data;
      });

   $scope.changeTopic = function(event, topicId) {
      var topicLogo = angular.element(event.target.parentNode).find('div:last i');
      if (topicLogo.hasClass('fa-times')) {
         $scope.user.topics.push(topicId);
         topicLogo.removeClass('fa-times').addClass('fa-check');
      } else {
         $scope.user.topics.splice(topicId, 1);
         topicLogo.removeClass('fa-check').addClass('fa-times');
      }
   };

   $scope.submitForm = function() {
      if (!$scope.user.topics[0]) {
         $('html,body').animate({
            scrollTop: $("form").offset().top
         }, 'slow');
         $('#topic-warning').addClass('text-danger');
      } else {
         $('#topic-warning').removeClass('text-danger');
         $http.defaults.headers.post['Content-Type'] = 'application/json';
         $http({
            method: 'POST',
            crossDomain: true,
            url: 'http://0.0.0.0:8080/api/users',
            data: {
               'firstName': $scope.user.firstName,
               'gender': $scope.user.gender,
               'status': $scope.user.status,
               'lastName': $scope.user.lastName,
               'email': $scope.user.email,
               'departure': $scope.user.departure,
               'topics': $scope.user.topics
            }, //forms user object
         }).then(
            function(success) {
               $('.alert-success').fadeIn().removeClass('hidden').delay(3000).fadeOut('slow');
               $scope.serverResponse = success;
               $scope.successMessage = 'Envoi effectué avec succès !';
               Cookies.remove('token');
               Cookies.set('token', success.data.token, {
                  expires: 7,
                  path: '/'
               });
               $window.location.href = '#!/result/' + success.data.token;
            },
            function(error) {

               $('html,body').animate({
                  scrollTop: $("#blue").offset().top
               }, 'slow');
               var content;
               $scope.serverResponse = error;
               if (error.status === -1) {
                  content = 'Service indisponible : le serveur le répond pas...';
               } else {
                  content = 'Cette adresse email existe déjà';
               }
               $('.alert-warning').fadeIn().removeClass('hidden').delay(3000).fadeOut('slow');
               $scope.serverResponse = error;
               $scope.warningMessage = content;
            });
      }
   };
});
