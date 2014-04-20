angular
  .module('app', [
    'ngRoute',
    'classy',
    'restangular',
    'app.services'
  ])
  .config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  })
  .config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  })
  .config(function(RestangularProvider) {
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setMethodOverriders(["put", "patch"]);
    RestangularProvider.setErrorInterceptor(function(error) {
      if (!error.data.message) {
        Messenger().post({
          message: 'Oops, looks like an error occured on our end. Sorry about that',
          type: 'error'
        });
        return false;
      }

      var msg = _.isArray(error.data.message) ? error.data.message.join('<br />') : error.data.message;

      Messenger().post({
        message: msg,
        type: 'error'
      });

      return false;
    });
  });

angular.module('app.services', []);

Messenger.options = {
  extraClasses: "messenger-fixed messenger-on-top",
  theme: "flat"
};