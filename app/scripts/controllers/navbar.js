'use strict';
/* global $ */
angular.module('smartSearchApp').controller('navbarCtrl', function($scope) {
  $scope.setActive = function(event) {
    var currentPage = angular.element(event.target.parentNode);
    $("li").removeClass('active');
    currentPage.addClass('active');
  };
});
