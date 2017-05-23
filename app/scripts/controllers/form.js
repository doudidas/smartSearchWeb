'use strict';
/* global $ */
/**
 * @ngdoc function
 * @name smartSearchApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the smartSearchApp
 */
angular.module('smartSearchApp');

angular.module('smartSearchApp').controller('FormCtrl', function($scope, $http, $location) {
  $scope.user = {
    'topics': []
  };
  $scope.serverResponse = {};

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
    $http.defaults.headers.post['Content-Type'] = 'application/json';
    $http({
      method: 'POST',
      url: 'http://localhost:8080/api/users',
      data: {
        'firstName': $scope.user.firstName,
        'lastName': $scope.user.lastName,
        'email': $scope.user.email,
        'departure': $scope.user.departure,
        'topics': $scope.user.topics
      }, //forms user object
    }).then(function(success) {
      $('.alert-success').fadeIn().removeClass('hidden').delay(3000).fadeOut('slow');
      $scope.serverResponse = success;
      $scope.successMessage = 'Envoi effectué avec succès !';

    }, function(error) {
      var content;
      if (error.status === -1) {
        content = 'Service indisponible : le serveur le répond pas...';
      } else {
        content = 'Cette adresse email existe déjà';
      }

      $('.alert-warning').fadeIn().removeClass('hidden').delay(3000).fadeOut('slow');
      $scope.serverResponse = error;
      $scope.warningMessage = content;
         $location.path('/login');
    });
  };
});
