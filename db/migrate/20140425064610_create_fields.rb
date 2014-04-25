class CreateFields < ActiveRecord::Migration
  def change
    create_table :fields do |t|
      t.references :section
      t.string :name
      t.string :value
      t.timestamps
    end
  end
end
