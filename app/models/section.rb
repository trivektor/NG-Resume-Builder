class Section < ActiveRecord::Base

  belongs_to :resume

  validates_presence_of :title
  validates_uniqueness_of :title

end
