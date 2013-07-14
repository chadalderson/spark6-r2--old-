source 'https://rubygems.org'

gem 'rails', '3.2.13'
gem 'newrelic_rpm'

gem 'aws-sdk'
gem 'paperclip'
gem 'instagram'

group :production do
  gem 'pg'
  gem 'unicorn'
end

group :development do
  gem 'thin'
  gem 'sqlite3'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'letter_opener'
end

group :development, :test do
  gem 'rspec-rails'
  gem 'shoulda'
  gem 'guard-spork'
  gem 'guard-rspec'
  gem 'shoulda-matchers'
end

group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'uglifier',     '>= 1.0.3'
end

gem 'jquery-rails'
