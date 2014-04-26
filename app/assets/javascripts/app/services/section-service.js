angular.module('app.services').service('Section', function(Restangular) {

  var Section = function(resume, section) {
    this.resume = resume;
    this.section = section;
  }

  Section.prototype.createField = function(attrs) {
    return Restangular.one('resumes', this.resume.id).one('sections', this.section.id).all('fields').post(attrs);
  }

  Section.prototype.removeField = function(field) {
    return Restangular.one('resumes', this.resume.id).one('sections', this.section.id).one('fields', field.id).remove();
  }

  Section.createInstance = function(resume, section) {
    return new Section(resume, section);
  }

  return Section;

});