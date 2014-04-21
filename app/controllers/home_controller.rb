class HomeController < ApplicationController

  before_action do
    redirect_to resumes_path if user_signed_in?
  end

  def index
  end

end
