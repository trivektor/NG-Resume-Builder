angular.module('app.services').service('Field', function(Restangular) {

  var Field = function(resume, section, field) {
    this.resume = resume;
    this.section = section;
    this.field = field;
    this.attributes = _.extend({}, field);
  }

  Field.createInstance = function(resume, section, field) {
    return new Field(resume, section, field);
  }

  Field.prototype.save = function(attrs) {
    return Restangular.one('resumes', this.resume.id).one('sections', this.section.id).all('fields').post(attrs);
  }

  Field.prototype.update = function(newAttrs) {
    _.extend(this.attributes, newAttrs);
    var field = Restangular.one('resumes', this.resume.id).one('sections', this.section.id).one('fields', this.field.id);
    _.extend(field, newAttrs);
    return field.put();
  }

  Field.prototype.delete = function() {
    return Restangular.one('resumes', this.resume.id).one('sections', this.section.id).one('fields', this.field.id).remove();
  }

  return Field;

});