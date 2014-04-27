class ResumesController < ApplicationController
  before_action :authenticate_user!
  def index
    render_spa
  end

  def edit
    render_spa
  end

  private

  def render_spa
    render :spa
  end
end
