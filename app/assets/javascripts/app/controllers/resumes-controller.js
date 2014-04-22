angular.module('app').classy.controller({
  name: 'ResumesController',

  inject: ['$scope', '$rootScope', '$location', '$modal', 'Resume'],

  init: function() {
    var $scope = this.$scope;
    this.$rootScope.pageTitle = 'Resumes';

    this.Resume.fetchAll().then(function(response) {
      $scope.resumes = response;
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

  inject: ['$scope', '$rootScope', '$location', '$routeParams', 'Resume'],

  init: function() {
    this.$rootScope.pageTitle = 'Edit Resume';
    var $scope = this.$scope;
    this.resume = this.Resume.createInstance();

    this.fetchSections().enableSorting().registerEventHandlers();
  },

  fetchSections: function() {
    var $scope = this.$scope;

    this.Resume.findById(this.$routeParams.id).then(_.bind(function(response) {
      $scope.resume = response;
      this.resume.set(response);
    }, this));

    return this;
  },

  enableSorting: function() {
    var $scope = this.$scope;

    $scope.sortableOptions = {
      update: function(event, ui) {
        $scope.$emit('sections:sorted');
      }
    };

    return this;
  },

  registerEventHandlers: function() {
    var $scope = this.$scope;
    var resume = this.resume;

    $scope.$on('sections:sorted', function(event) {
      resume.reorderSections($scope.resume.sections).then(function() {
        Messenger().post({
          message: 'Sections reordered',
          hideAfter: 1
        })
      });
    });
  },

  createSection: function() {
    this.resume.addSection(this.$scope.section_title).then(_.bind(function(response) {
      Messenger().post({
        message: 'Section added',
        hideAfter: 2
      });

      this.resume.get('sections').push(response);
      this.$scope.section_title = '';
    }, this));
  },

  deleteSection: function(section) {
    if (confirm('Are you sure?')) {
      this.resume.deleteSection(section).then(_.bind(function() {
        Messenger().post({
          message: 'Section deleted',
          hideAfter: 2
        });

        var sections = this.resume.get('sections');
        _.remove(sections, function(s) {
          return s.id === section.id
        })
      }, this));
    }
  }
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