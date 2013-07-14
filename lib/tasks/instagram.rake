namespace :instagram do
  desc "Authorize Instagram account"
  task :authorize => :environment do
    email = ENV["INSTAGRAM_EMAIL"]
    InstagramMailer::authorization_email(email).deliver
  end

  desc "Fetch image objects, store data and download all size photos"
  task :get_photos => :environment do
    puller = InstagramPuller.new
    puller.pull
    puller.store
  end
end
