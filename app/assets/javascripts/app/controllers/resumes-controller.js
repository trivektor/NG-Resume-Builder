angular.module('app').classy.controller({
  name: 'ResumesController',

  inject: ['$scope', '$location', '$modal', 'Resume'],

  init: function() {
    var $scope = this.$scope;

    $scope.resumes = [];

    this.Resume.fetchAll().then(function(response) {
      angular.copy(response, $scope.resumes);
    });

    $scope.$on('resumeCreated', _.bind(function(event, resume) {
      $scope.resumes.push(resume);
      this.modalInstance.close();
    }, this));

    $scope.$on('resumeDeleted', function(event, resume) {
      _.remove($scope.resumes, function(r) {
        return r.id === resume.id;
      });
    });
  },

  createNew: function() {
    this.modalInstance = this.$modal.open({
      templateUrl: '/assets/app/templates/resumes/new.html',
      controller: 'NewResumeController'
    });
  }
});

angular.module('app').classy.controller({
  name: 'NewResumeController',

  inject: ['$scope', '$rootScope', 'Resume'],

  init: function() {
    this.resume = this.Resume.createInstance();
    this.$scope.resume = {};
  },

  create: function() {
    var $scope = this.$scope;
    var $rootScope = this.$rootScope;

    var r = this.resume.set($scope.resume);

    r.save().then(function(response) {
      Messenger().post({
        message: 'Resume created',
        hideAfter: 2
      });
      $rootScope.$broadcast('resumeCreated', response);
    });
  }
});

angular.module('app').classy.controller({
  name: 'ResumeController',

  inject: ['$scope', '$rootScope', 'Resume'],

  delete: function() {
    if (confirm('Are you sure?')) {
      var $rootScope = this.$rootScope;
      var $scope = this.$scope;

      var resume = this.Resume.createInstance();
      resume.set({id: $scope.resume.id});

      resume.delete().then(function() {
        Messenger().post({
          message: 'Resume deleted',
          hideAfter: 2
        });
        $rootScope.$broadcast('resumeDeleted', $scope.resume);
      });
    }
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