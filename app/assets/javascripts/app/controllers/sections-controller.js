angular.module('app').classy.controller({
  name: 'SectionController',

  inject: ['$scope', 'Section'],

  ngInit: function(resume, section) {
    this.section = this.Section.createInstance(resume, section);
  },

  createField: function() {
    var $scope = this.$scope;

    this.section.createField(_.pick(this.$scope, 'name', 'value')).then(function(response) {

      Messenger().post({
        message: 'Field added',
        hideAfter: 1
      });

      $scope.section.fields.push(response);
      $scope.name = '';
      $scope.value = '';

    });
  },

  removeField: function(field) {
    if (confirm('Are you sure?')) {
      var $scope = this.$scope;

      this.section.removeField(field).then(function() {
        Messenger().post({
          message: 'Field deleted',
          hideAfter: 1
        });

        _.remove($scope.section.fields, function(f) {
          return f.id === field.id;
        });
      });
    }
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

  delete: function(section) {
    if (confirm('Are you sure?')) {
      var $scope = this.$scope;

      this.section.delete(section.id).then(function() {
        Messenger().post({
          message: 'Section deleted',
          hideAfter: 2
        });

        $scope.$emit('section:deleted', section);
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