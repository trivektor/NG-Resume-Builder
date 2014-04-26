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
  }
});