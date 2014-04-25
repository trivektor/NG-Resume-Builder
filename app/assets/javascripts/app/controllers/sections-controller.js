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
        message: 'Field created',
        hideAfter: 1
      });

      $scope.section.fields.push(response);
      $scope.name = '';
      $scope.value = '';

    });
  },

  removeField: function() {
    if (confirm('Are you sure?')) {

    }
  }
});