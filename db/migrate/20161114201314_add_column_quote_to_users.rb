class AddColumnQuoteToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :quote, :string
  end
end
