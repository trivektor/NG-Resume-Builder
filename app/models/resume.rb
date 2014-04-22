class Resume < ActiveRecord::Base

  belongs_to :user
  has_many :sections, dependent: :destroy, order: 'weight asc'

  validates_presence_of :name
  validates_uniqueness_of :name

  def as_json(options={})
    super(include: :sections).merge({
      url: "/resumes/#{id}/edit"
    })
  end

end
