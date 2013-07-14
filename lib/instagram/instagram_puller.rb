class InstagramPuller
  WHITELIST_FILE  = Rails.root.join('config', 'instagram', 'whitelist.yml')

  attr_accessor :whitelist, :photos, :new_photos

  def initialize
    @whitelist = read_whitelist
    @photos    = []
    Instagram.access_token = InstagramConnection.pluck(:access_token).last
  end

  def pull
    whitelist[:usernames].each do |username|
      recent_photos = Instagram.user_recent_media(self.class.user_id(username))

      whitelist[:tags].each do |tag|
        photos << recent_photos.select { |photo| photo.tags.include?(tag) }
      end
    end

    photos.flatten!
  end

  def store
    if photos.count > 0
      photos.each do |foto|
        unless InstagramPhoto.exists?(instagram_id: foto.id)
          instagram = InstagramPhoto.new({
            instagram_id: foto.id,
            username: foto.user.username,
            full_name: foto.user.full_name,
            link: foto.link,
            tags: foto.tags.join(","),
            caption: (foto.caption.text if foto.caption),
            low_resolution_url: foto.images.low_resolution.url,
            standard_resolution_url: foto.images.standard_resolution.url,
            thumbnail_url: foto.images.thumbnail.url,
            created_time: foto.created_time,
          })
          instagram.photo = URI.parse(instagram.standard_resolution_url)
          instagram.save
        end
      end
    end
  end

  def self.user_id username
    Instagram.user_search(username).first.id
  end

  private

  def read_whitelist
    YAML::load(File.open(WHITELIST_FILE))
  end
end
