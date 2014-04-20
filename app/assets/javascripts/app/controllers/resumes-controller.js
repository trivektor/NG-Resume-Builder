angular.module('app').classy.controller({
  name: 'ResumesController',

  inject: ['$scope', '$location', 'Resume'],

  init: function() {
    this.$scope.resumes = [];
    this.Resume.fetchAll().then(_.bind(function(response) {
      angular.copy(response, this.$scope.resumes);
    }, this));
  },

  createNew: function() {
    this.$location.path('/resumes/new');
  }
});

angular.module('app').classy.controller({
  name: 'NewResumeController',

  inject: ['$scope', '$location', '$timeout', 'Resume'],

  init: function() {
    this.resume = this.Resume.createInstance();
  },

  create: function() {
    var r = this.resume.set(_.pick(this.$scope, 'name', 'description'));

    r.save().then(_.bind(function(response) {
      Messenger().post('Resume created');

      this.$timeout(_.bind(function() {
        this.$location.path('/resumes');
      }, this), 1000);

    }, this));
  }
});

angular.module('app').classy.controller({
  name: 'EditResumeController',

  inject: ['$scope', '$location', 'Resume']
})

angular.module('app').config(function ($routeProvider) {

  $routeProvider
    .when('/resumes', {
      controller: 'ResumesController',
      templateUrl: '/assets/app/templates/resumes/index.html'
    })
    .when('/resumes/new', {
      controller: 'NewResumeController',
      templateUrl: '/assets/app/templates/resumes/new.html'
    })
    .when('/resumes/:id/edit', {
      controller: 'EditResumeController',
      templateUrl: '/assets/app/templates/resumes/edit.html'
    });

});