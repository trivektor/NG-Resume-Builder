class ChangeDataTypeOfValueInFields < ActiveRecord::Migration
  def change
    change_column :fields, :value, :text
  end
end
