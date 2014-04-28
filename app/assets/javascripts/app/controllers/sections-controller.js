angular.module('app').classy.controller({
  name: 'SectionController',

  inject: ['$scope', 'Section'],

  init: function() {
    var $scope = this.$scope;
    this.section = this.Section.createInstance($scope.resume, $scope.section);
    this.setupEventHandlers();
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
    this.section.save({title: $scope.title}).then(function(response) {
      $scope.$emit('section:created', response);
      $scope.title = '';

      Messenger().post({
        message: 'Section added',
        hideAfter: 2
      })
    });
  }
});