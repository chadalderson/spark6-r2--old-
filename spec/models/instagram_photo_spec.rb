require 'spec_helper'

describe InstagramPhoto do
  it { should validate_uniqueness_of(:instagram_id) }
end
