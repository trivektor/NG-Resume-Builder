angular.module('app').classy.controller({
  name: 'FieldController',

  inject: ['$scope', 'Field'],

  init: function() {
    var $scope = this.$scope;
    this.field = this.Field.createInstance($scope.resume, $scope.section, $scope.field);
  },

  update: function() {
    var attrs = _.pick(this.$scope.field, 'name', 'value');

    this.field.update(attrs).then(function(response) {
      Messenger().post({
        message: 'Field updated',
        hideAfter: 1
      });
    });
  },

  delete: function() {
    if (confirm('Are you sure?')) {
      var $scope = this.$scope;

      this.field.delete().then(function() {
        Messenger().post({
          message: 'Field deleted',
          hideAfter: 1
        });
        $scope.$emit('field:deleted', $scope.field);
      });
    }
  }
});

angular.module('app').classy.controller({
  name: 'NewFieldController',

  inject: ['$scope', 'Field'],

  init: function() {
    var $scope = this.$scope;
    this.field = this.Field.createInstance($scope.resume, $scope.section, $scope.field);
  },

  create: function() {
    var $scope = this.$scope;

    this.field.save(_.pick($scope, 'name', 'value')).then(function(response) {
      $scope.$emit('field:created', response);
      $scope.name = '';
      $scope.value = '';

      Messenger().post({
        message: 'Field added',
        hideAfter: 1
      });
    });
  }
});