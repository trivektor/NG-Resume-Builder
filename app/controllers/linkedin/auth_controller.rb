class Linkedin::AuthController < ApplicationController

  before_action :init_client

  def index
    request_token = @client.request_token(:oauth_callback => "http://#{request.host}:#{request.port}/linkedin/auth/callback")
    session[:rtoken] = request_token.token
    session[:rsecret] = request_token.secret

    redirect_to @client.request_token.authorize_url
  end

  def callback
    if session[:atoken].nil?
      pin = params[:oauth_verifier]
      atoken, asecret = @client.authorize_from_request(session[:rtoken], session[:rsecret], pin)
      session[:atoken] = atoken
      session[:asecret] = asecret    
    end

    redirect_to resumes_path
  end

  private

  def init_client
    @client = LinkedIn::Client.new(ENV['LINKEDIN_API_KEY'], ENV['LINKEDIN_SECRET_KEY'])
  end

end
