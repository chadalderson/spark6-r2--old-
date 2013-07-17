class Message

	# adds validation methods
	include ActiveModel::Validations
	# adds form helper methods
	include ActiveModel::Conversion
	# gives class model_name method
	extend ActiveModel::Naming
	
	# assigns reader and writer methods
	attr_accessor :name, :email, :company, :website, :phone, :message
	
	# validation requirements
	validates :name, :email, :phone, :message, :presence => true
	validates :email, :format => { :with => %r{.+@.+\..+} }, :allow_blank => true
	
	# sends name and value
	def initialize(attributes = {})
		attributes.each do |name, value|
			send("#{name}=", value)
		end
	end

	# 	
	def persisted?
		false
	end

end