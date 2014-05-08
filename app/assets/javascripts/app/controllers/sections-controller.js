angular.module('app').classy.controller({
  name: 'SectionController',

  inject: ['$scope', 'Section'],

  init: function() {
    var $scope = this.$scope;

    $scope.actions = {
      add_field: false,
      add_section: false,
      sort_sections: false
    }

    this.section = this.Section.createInstance($scope.resume, $scope.section);
    this.setupEventHandlers();

    $scope.$on('section:created', function(event, newSection, parentSection) {
      if (parentSection) {
        $scope.section.children.push(newSection);
      } else {
        $scope.section
      }
    });
  },

  setupEventHandlers: function() {
    var $scope = this.$scope;

    $scope.$on('field:created', function(event, field) {
      $scope.section.fields.push(field);
    });

    $scope.$on('field:deleted', function(event, field) {
      _.remove($scope.section.fields, function(f) {
        return f.id === field.id;
      })
    });

    $scope.$on('sorting:toggle', function(event) {
      $scope.actions.sort_sections = !$scope.actions.sort_sections;
    });
  },

  update: function() {
    var attrs = _.pick(this.$scope.section, 'title');

    if (!this.section.hasChanged(attrs)) return;

    this.section.update(attrs).then(function() {
      Messenger().post({
        message: 'Section updated',
        hideAfter: 2
      });
    });
  },

  delete: function() {
    if (confirm('Are you sure?')) {
      var $scope = this.$scope;

      this.section.delete().then(function() {
        Messenger().post({
          message: 'Section deleted',
          hideAfter: 2
        });

        $scope.$emit('section:deleted', $scope.section);
      });
    }
  }
});

angular.module('app').classy.controller({
  name: 'NewSectionController',

  inject: ['$scope', 'Section'],

  create: function() {
    var $scope = this.$scope;
    this.section = this.Section.createInstance($scope.resume);

    var params = $scope.section;
    var parentSection = this.parentSection;

    if (parentSection) {
      params.parent_id = parentSection.id;
    }

    this.section.save(params).then(function(response) {
      $scope.$emit('section:created', response, parentSection);
      $scope.section.title = '';

      Messenger().post({
        message: 'Section added',
        hideAfter: 2
      })
    });
  },

  prepareForm: function(parentSection) {
    this.parentSection = parentSection;
    this.$scope.section = {
      parent_id: parentSection.id
    };
  }
});