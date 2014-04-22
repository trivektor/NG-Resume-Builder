class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.references :resume
      t.string :title
      t.string :weight
      t.timestamps
    end
  end
end
