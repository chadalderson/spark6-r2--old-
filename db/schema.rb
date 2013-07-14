# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130604234354) do

  create_table "instagram_connections", :force => true do |t|
    t.string   "username"
    t.string   "user_id"
    t.string   "access_token"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

  create_table "instagram_photos", :force => true do |t|
    t.string   "instagram_id"
    t.string   "username"
    t.string   "full_name"
    t.string   "link"
    t.string   "tags"
    t.string   "caption"
    t.string   "low_resolution_url"
    t.string   "standard_resolution_url"
    t.string   "thumbnail_url"
    t.string   "created_time"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
    t.datetime "created_at",              :null => false
    t.datetime "updated_at",              :null => false
  end

  add_index "instagram_photos", ["instagram_id"], :name => "index_instagram_photos_on_instagram_id", :unique => true

end
