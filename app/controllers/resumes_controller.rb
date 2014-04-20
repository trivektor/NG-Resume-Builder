class ResumesController < ApplicationController

  def index
  end

  def create
    respond_to do |format|
      format.json do
        resume = Resume.new(resume_params)
        resume.user = current_user

        if resume.save
          render json: resume
        else
          render json: {message: resume.errors.full_messages}, status: :bad_request
        end
      end
    end
  end

  private

  def resume_params
    params.require(:resume).permit(:name, :description)
  end

end
