class Resume < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :user
  has_many :sections, -> { order(weight: :asc) }, dependent: :destroy

  validates :name, presence: true, uniqueness: true

  def as_json(options={})
    super.merge({
      url: "/resumes/#{slug}/edit",
      live_url: "/resumes/#{slug}",
      sections: sections.as_json(include: :fields)
    })
  end

end
