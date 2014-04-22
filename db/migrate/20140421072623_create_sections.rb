class CreateSections < ActiveRecord::Migration
  def change
    create_table :sections do |t|
      t.references :resume
      t.string :title
      t.integer :weight
      t.timestamps
    end
  end
end
