class Api::SectionsController < ApplicationController

  before_action :authenticate_user!

  def create
    respond_to do |format|
      format.json do
        section = Section.new(section_params)
        section.resume = Resume.find(params[:resume_id])
        if section.save
          render json: section
        else
          render json: {message: section.errors.full_messages}, status: :bad_request
        end
      end
    end
  end

  private

  def section_params
    params.require(:section).permit(:title)
  end

end
