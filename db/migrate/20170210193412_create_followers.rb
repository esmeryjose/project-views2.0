class CreateFollowers < ActiveRecord::Migration[5.0]
  def change
    create_table :follows do |t|
      t.integer :user_id
      t.integer :following_id
      t.boolean :request

      t.timestamps
    end
  end
end
