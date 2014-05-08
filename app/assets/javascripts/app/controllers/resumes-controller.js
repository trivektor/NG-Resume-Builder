angular.module('app').classy.controller({
  name: 'ResumesController',

  inject: ['$scope', '$rootScope', '$location', '$modal', 'Resume'],

  init: function() {
    var $scope = this.$scope;
    this.$rootScope.pageTitle = 'Resumes';

    this.Resume.fetchAll().then(function(response) {
      $scope.resumes = response;
    });

    $scope.$on('resume:created', _.bind(function(event, resume) {
      $scope.resumes.push(resume);
      this.modalInstance.close();
    }, this));

    $scope.$on('resume:delete', function(event, resume) {
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
    this.$scope.resume = {};
  },

  create: function() {
    var $scope = this.$scope;
    var $rootScope = this.$rootScope;

    this.Resume.create(_.pick($scope.resume, 'name', 'description')).then(function(response) {
      Messenger().post({
        message: 'Resume created',
        hideAfter: 2
      });

      $rootScope.$broadcast('resume:created', response);
    });
  }
});

angular.module('app').classy.controller({
  name: 'ResumeController',

  inject: ['$scope', 'Resume'],

  delete: function() {
    if (confirm('Are you sure?')) {
      var $scope = this.$scope;

      var resume = this.Resume.createInstance($scope.resume);

      resume.delete().then(function() {
        Messenger().post({
          message: 'Resume deleted',
          hideAfter: 2
        });
        $scope.$emit('resume:delete', $scope.resume);
      });
    }
  }
});

angular.module('app').classy.controller({
  name: 'EditResumeController',

  inject: ['$scope', '$rootScope', '$location', '$routeParams', 'Resume'],

  init: function() {
    this.$rootScope.pageTitle = 'Edit Resume';
    this.fetchSections().then(_.bind(function() {
      this.enableSorting().registerEventHandlers();
    }, this));

    this.$scope.actions = {
      sort_sections: false,
      add_section: false
    }
  },

  fetchSections: function() {
    var $scope = this.$scope;

    return this.Resume.findById(this.$routeParams.id).then(_.bind(function(response) {
      $scope.resume = response;
      this.resume = this.Resume.createInstance($scope.resume);
    }, this));
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

    $scope.$on('sections:sorted', _.bind(function(event) {
      this.resume.reorderSections($scope.resume.sections).then(function() {
        Messenger().post({
          message: 'Sections reordered',
          hideAfter: 1
        })
      });
    }, this));

    $scope.$on('section:created', function(event, section) {
      $scope.resume.sections.push(section);
    });

    $scope.$on('section:deleted', function(event, section) {
      _.remove($scope.resume.sections, function(s) {
        return section.id === s.id;
      });
    });

    return this;
  },

  update: function() {
    var attrs = _.pick(this.$scope.resume, 'name', 'description');

    if (!this.resume.hasChanged(attrs)) return;

    this.resume.update(attrs).then(function() {
      Messenger().post({
        message: 'Resume saved',
        hideAfter: 1
      });
    });
  }
});