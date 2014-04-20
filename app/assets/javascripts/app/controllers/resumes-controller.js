angular.module('app').classy.controller({
  name: 'ResumesController',

  inject: ['$scope', '$location'],

  init: function() {

  },

  createNew: function() {
    this.$location.path('/resumes/new');
  }
});

angular.module('app').classy.controller({
  name: 'NewResumeController',

  inject: ['$scope', '$location'],

  create: function() {

  }
});

angular.module('app').config(function ($routeProvider) {

  $routeProvider
    .when('/resumes', {
      controller: 'ResumesController',
      templateUrl: '/assets/app/templates/resumes/index.html'
    })
    .when('/resumes/new', {
      controller: 'NewResumeController',
      templateUrl: '/assets/app/templates/resumes/new.html'
    });

});