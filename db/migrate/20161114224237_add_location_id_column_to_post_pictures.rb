class AddLocationIdColumnToPostPictures < ActiveRecord::Migration[5.0]
  def change
    add_column :post_pictures, :location_id, :integer
  end
end
