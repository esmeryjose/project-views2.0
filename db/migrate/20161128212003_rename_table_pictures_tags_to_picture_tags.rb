class RenameTablePicturesTagsToPictureTags < ActiveRecord::Migration[5.0]
  def change
    rename_table :pictures_tags, :picture_tags
  end
end
