'use strict';

/**
 * @ngdoc function
 * @name activitiApp.controller:FormCtrl
 * @description
 * # FormCtrl
 * Controller of the activitiApp
 */
angular.module('activitiApp')
  .controller('FormCtrl', function($scope) {
    $scope.user = {
      "firstName": "",
      "lasName": "",
      "topic": [],
    }

    $scope.changeTopic = function(event, topicId) {
      var topicLogo = angular.element(event.target.parentNode).find("div:last i");
      if (topicLogo.hasClass('fa-times')) {
        $scope.user.topic.push(topicId);
        topicLogo.removeClass('fa-times').addClass('fa-check');
      } else {
        $scope.user.topic.splice(topicId, 1);
        topicLogo.removeClass('fa-check').addClass('fa-times');
      }
    };
  });
