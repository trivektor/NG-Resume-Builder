angular.module('app.services').service('Resume', function(Restangular, Section) {

  var Resume = function(resume) {
    this.resume = resume;
    this.attributes = {};
  }

  Resume.create = function(attrs) {
    return Restangular.all('resumes').post(attrs);
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

  Resume.prototype.get = function(attr) {
    return this.attributes[attr];
  }

  Resume.prototype.update = function(attrs) {
    this.set(attrs);
    var resume = Restangular.one('resumes', this.resume.id);
    _.extend(attributes, attrs);
    return resume.put();
  }

  Resume.prototype.hasChanged = function(newAttrs) {
    for (var attr in newAttrs) {
      if (this.get(attr) !== newAttrs[attr]) {
        return true;
      }
    }

    return false;
  }

  Resume.prototype.delete = function() {
    return Restangular.one('resumes', this.resume.id).remove();
  }

  Resume.prototype.reorderSections = function(orderedSections) {
    return Restangular.one('resumes', this.get('id')).all('sections').customPOST({ordered_sections: orderedSections}, 'reorder');
  }

  Resume.createInstance = function(resume) {
    return new Resume(resume);
  }

  Resume.findById = function(id) {
    return Restangular.one('resumes', id).get();
  }

  Resume.fetchAll = function() {
    return Restangular.all('resumes').getList();
  }

  return Resume;

});