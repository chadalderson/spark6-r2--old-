class AboutController < ApplicationController
  def index
    @instagrams = InstagramPhoto.all
  end
end
