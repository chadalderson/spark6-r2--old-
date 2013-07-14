require Rails.root.join('lib', 'instagram', 'instagram_puller')

INSTAGRAM_AUTH_KEY = 'trl6t0LeFl6qLacH7ED3eF7lEcOEhIaJ'

if Rails.env.production?
  INSTAGRAM_AUTH_URL = "#{ENV['INSTAGRAM_AUTH_URL']}/instagram/callback?authkey=#{INSTAGRAM_AUTH_KEY}"
else
  INSTAGRAM_AUTH_URL = "http://localhost:3000/instagram/callback?authkey=#{INSTAGRAM_AUTH_KEY}"
end

Instagram.configure do |config|
  config.client_id = '93bcf72463134fbabcf8fceed3ddb863'
  config.client_secret = '3d81b5e4b77a4efdac742a678b357f99'
end
