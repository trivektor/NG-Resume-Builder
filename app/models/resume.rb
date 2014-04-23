class Resume < ActiveRecord::Base

  belongs_to :user
  has_many :sections, dependent: :destroy, order: 'weight asc'

  validates :name, presence: true, uniqueness: true

  def as_json(options={})
    super(include: :sections).merge({
      url: "/resumes/#{id}/edit"
    })
  end

end
