class CreateInstagramPhotos < ActiveRecord::Migration
  def change
    create_table :instagram_photos do |t|
      t.string :instagram_id
      t.string :username
      t.string :full_name
      t.string :link
      t.string :tags
      t.string :caption
      t.string :low_resolution_url
      t.string :standard_resolution_url
      t.string :thumbnail_url
      t.string :created_time
      t.string :photo_file_name
      t.string :photo_content_type
      t.integer :photo_file_size
      t.datetime :photo_updated_at

      t.timestamps
    end
    add_index :instagram_photos, :instagram_id, unique: true
  end
end
