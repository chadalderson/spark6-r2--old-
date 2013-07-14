class InstagramConnection < ActiveRecord::Base
  attr_accessible :access_token, :user_id, :username
  validates_presence_of :access_token
end
