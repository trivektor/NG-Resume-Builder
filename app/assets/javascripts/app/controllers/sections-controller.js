angular.module('app').classy.controller({
  name: 'SectionController',

  inject: ['$scope', 'Section'],

  ngInit: function(resume, section) {
    this.section = this.Section.createInstance(resume, section);
  },

  createField: function() {
    this.section.createField(_.pick(this.$scope, 'name', 'value')).then(function() {
      Messenger().post({
        message: 'Field created',
        hideAfter: 1
      });
    });
  }
});