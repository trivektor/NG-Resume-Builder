class AddSlugToResumes < ActiveRecord::Migration
  def change
    add_column :resumes, :slug, :string, after: :id
  end
end
