class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  include SessionsHelper

    def str_simpl str
	  	result = str.gsub( /\s+/, ' ')
	  	result.gsub!( /^\s/, '')
	  	result.gsub!(/\s$/, '')
	  	return nil unless result.size > 0
	  	return result
	end
end
