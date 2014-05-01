class Section < ActiveRecord::Base

  belongs_to :resume
  has_many :fields, dependent: :destroy

  validates :title, presence: true

  before_create do
    self.weight = self.class.count + 1
  end

  def as_json(options={})
    super(include: :fields)
  end

end
