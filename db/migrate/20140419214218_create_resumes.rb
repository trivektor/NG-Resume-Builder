class CreateResumes < ActiveRecord::Migration
  def change
    create_table :resumes do |t|
      t.references :user
      t.string :name
      t.text :description, limit: 500
      t.boolean :active, default: false
      t.timestamps
    end
  end
end
