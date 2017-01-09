class ChangeColumnNameInComments < ActiveRecord::Migration[5.0]
  def change
    rename_column :comments, :post_picture_id, :picture_id
  end
end
