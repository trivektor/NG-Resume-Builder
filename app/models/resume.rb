class Resume < ActiveRecord::Base

  belongs_to :user
  validates_presence_of :name
  validates_uniqueness_of :name

  def as_json(options={})
    super.merge({
      url: "/resumes/#{id}/edit"
    })
  end

end
