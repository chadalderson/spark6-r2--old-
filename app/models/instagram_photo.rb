class InstagramPhoto < ActiveRecord::Base
  default_scope order('created_time DESC')

  attr_accessible :caption, :created_time, :full_name, :instagram_id, :link,
    :low_resolution_url, :standard_resolution_url, :thumbnail_url, :username, :tags,
    :photo_file_name, :photo_content_type, :photo_file_size, :photo_updated_at

  validates_uniqueness_of :instagram_id

  has_attached_file :photo

  after_create :notify_of_create

  private

  def notify_of_create
    puts "#{self.instagram_id} has been pulled."
  end
end
