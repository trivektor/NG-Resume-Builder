angular.module('app.services').service('Resume', function(Restangular, Section) {

  var Resume = function(resume) {
    this.resume = resume;
    this.attributes = _.extend({}, resume);
  }

  Resume.create = function(attrs) {
    return Restangular.all('resumes').post(attrs);
  }

  Resume.prototype.get = function(attr) {
    return this.attributes[attr];
  }

  Resume.prototype.update = function(attrs) {
    _.extend(this.attributes, attrs);
    var resume = Restangular.one('resumes', this.resume.id);
    _.extend(resume, attrs);
    return resume.put();
  }

  Resume.prototype.hasChanged = function(newAttrs) {
    for (var attr in newAttrs) {
      if (this.attributes[attr] !== newAttrs[attr]) {
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