class InstagramController < ApplicationController
  before_filter :authorize, only: :callback

  def callback
    response = Instagram.get_access_token(params[:code], :redirect_uri => INSTAGRAM_AUTH_URL)

    unless InstagramConnection.exists?(access_token: response.access_token)
      InstagramConnection.create({
        access_token: response.access_token,
        user_id:      response.user.id,
        username:     response.user.username
      })
    end

    redirect_to root_url and return
  end

  private

  def authorize
    if params[:authkey] != INSTAGRAM_AUTH_KEY
      redirect_to root_path and return
    end
  end
end
