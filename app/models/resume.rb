class Resume < ActiveRecord::Base

  belongs_to :user
  has_many :sections, dependent: :destroy, order: 'weight asc'

  validates :name, presence: true, uniqueness: true

  def as_json(options={})
    super.merge({
      url: "/resumes/#{id}/edit",
      sections: sections.as_json(include: :fields)
    })
  end

end
