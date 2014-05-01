class Resume < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :user
  has_many :sections, -> { order(weight: :asc) }, dependent: :destroy

  validates :name, presence: true

  INTERESTED_LINKEDIN_PROFILE_FIELDS = %w(skills certifications educations)

  def as_json(options={})
    super.merge({
      url: "/resumes/#{slug}/edit",
      live_url: "/resumes/#{slug}",
      sections: sections.as_json(include: :fields)
    })
  end

  def self.create_from_linkedin_profile(client, user)
    resume = create(
      name: "#{client.profile.first_name} #{client.profile.last_name}",
      description: 'Resume imported from LinkedIn',
      user: user
    )

    create_education(client, resume)
    create_skills(client, resume)
    create_positions(client, resume)
  end

  def self.create_education(client, resume)
    section = resume.sections.create(title: 'Education')

    client.profile(fields: %(educations)).educations.all.each do |mash|
      section.fields.create([
        {name: 'Degree', value: mash.degree},
        {name: 'School', value: mash.school_name},
        {name: 'Start Date', value: date_from_mash(mash.start_date)},
        {name: 'End Date', value: date_from_mash(mash.end_date)}
      ])
    end
  end

  def self.create_skills(client, resume)
    section = resume.sections.create(title: 'Skills')
    section.fields.create([
      {name: 'Skills', value: client.profile(fields: %(skills)).skills.all.map(&:skill).map(&:name).to_sentence}
    ])
  end

  def self.create_positions(client, resume)
    section = resume.sections.create(title: 'Positions')
    client.profile(fields: %(positions)).positions.all.each do |mash|
      section.fields.create([
        {name: 'Company', value: mash.name},
        {name: 'Industry', value: mash.industry},
        {name: 'Size', value: mash.size},
        {name: 'Summary', value: mash.summary},
        {name: 'Start Date', value: date_from_mash(mash.start_date)},
        {name: 'End Date', value: date_from_mash(mash.end_date)}
      ])
    end
  end

  def self.date_from_mash(mash)
    return '' unless mash.present?
    [mash.month, mash.day, mash.year].compact.join('/')
  end

end
