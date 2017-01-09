class ChangeTablePostPicturesNameToPictures < ActiveRecord::Migration[5.0]
  def change
    rename_table :post_pictures, :pictures
  end
end
