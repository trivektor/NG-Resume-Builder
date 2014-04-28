angular.module('app.services').service('Section', function(Restangular) {

  var Section = function(resume, section) {
    this.resume = resume;
    this.section = section;
    this.attributes = _.extend({}, section);
  }

  Section.createInstance = function(resume, section) {
    return new Section(resume, section);
  }

  Section.prototype.save = function(attrs) {
    return Restangular.one('resumes', this.resume.id).all('sections').post(attrs);
  }

  Section.prototype.update = function(newAttrs) {
    _.extend(this.attributes, newAttrs);
    var section = Restangular.one('resumes', this.resume.id).one('sections', this.section.id);
    _.extend(section, newAttrs);
    return section.put();
  }

  Section.prototype.hasChanged = function(newAttrs) {
    for (var attr in newAttrs) {
      if (this.attributes[attr] !== newAttrs[attr]) {
        return true;
      }
    }

    return false;
  }

  Section.prototype.delete = function() {
    return Restangular.one('resumes', this.resume.id).one('sections', this.section.id).remove();
  }

  return Section;

});