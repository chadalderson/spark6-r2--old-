class NotificationsMailer < ActionMailer::Base

	default from: "qa@spark6.com"
	default to: "qa@spark6.com"

	def new_message(message)
		@message = message
		mail(subject: "Contact Request from #{message.name}")
		mail(to: @message.email,
		     subject: "Thank you for contacting spark6", 
		     template_path: "contact_email",
		     template_name: "index")		     
	end

end
	