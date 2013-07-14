class CreateInstagramConnections < ActiveRecord::Migration
  def change
    create_table :instagram_connections do |t|
      t.string :username
      t.string :user_id
      t.string :access_token

      t.timestamps
    end
  end
end
