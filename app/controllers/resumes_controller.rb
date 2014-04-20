class ResumesController < ApplicationController

  def index
  end

  def create
    respond_to do |format|
      format.json do

      end
    end
  end

  private

  def resume_params
    params.require(:resume).permit(:name, :description)
  end

end
