angular
  .module('app', [
    'ngRoute',
    'classy',
  ])
  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  });