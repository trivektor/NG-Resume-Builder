class Section < ActiveRecord::Base

  has_ancestry

  belongs_to :resume
  has_many :fields, dependent: :destroy

  validates :title, presence: true

  before_create do
    self.weight = self.class.count + 1
  end

  def as_json(options={})
    # TODO: figure out eager loading
    super.merge({
      children: children
    })
  end

end
