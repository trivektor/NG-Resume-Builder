angular.module('app.services').service('Resume', function(Restangular) {

  var Resume = function() {
    this.attributes = {};
  }

  Resume.prototype.save = function(params) {
    return Restangular.all('resumes').post(this.attributes);
  }

  Resume.prototype.set = function() {
    if (arguments.length === 1 && _.isObject(arguments[0])) {
      var attrs = arguments[0];
      for (var key in attrs) {
        this.attributes[key] = attrs[key];
      }
    } else if (arguments.length === 2) {
      this.attributes[arguments[0]] = this.attributes[arguments[1]];
    } else {
      throw 'Please use Resume.set(attr_key, attr_value) or Resume.set({attr_key: attr_value})';
      return;
    }
    return this;
  }

  Resume.prototype.delete = function() {
    return Restangular.one('resumes', this.attributes.id).remove();
  }

  Resume.createInstance = function() {
    return new Resume;
  }

  Resume.findById = function(id) {
    return Restangular.one('resumes', id).get();
  }

  Resume.fetchAll = function() {
    return Restangular.all('resumes').getList();
  }

  return Resume;

});