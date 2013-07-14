class InstagramMailer < ActionMailer::Base
  default :from => "notifications@spark6.com"

  def authorization_email email
    @authorization_url = Instagram.authorize_url(redirect_uri: "#{INSTAGRAM_AUTH_URL}")
    mail to: email, subject: "Spark6 Website Instagram Authorization"
  end
end
