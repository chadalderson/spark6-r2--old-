class NotificationsMailer < ActionMailer::Base

	default :from => "greg@spark6.com"
	default :to => "greg@spark6.com"

	def new_message(message)
		@message = message
		mail(:subject => "Contact Request from #{message.name}")
	end

end
	