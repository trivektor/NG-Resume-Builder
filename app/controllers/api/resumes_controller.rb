class Api::ResumesController < ApplicationController

  before_action :authenticate_user!

  def index
    respond_to do |format|
      format.json do
        render json: current_user.resumes
      end
    end
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

  def show
    respond_to do |format|
      format.json do
        resume = Resume.find(params[:id])
        render json: resume
      end
    end
  end

  def destroy
    respond_to do |format|
      format.json do
        resume = Resume.find(params[:id])
        if resume.destroy
          head :ok
        end
      end
    end
  end

  private

  def resume_params
    params.require(:resume).permit(:name, :description)
  end

end