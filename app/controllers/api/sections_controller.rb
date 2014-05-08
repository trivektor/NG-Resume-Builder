class Api::SectionsController < ApplicationController

  before_action :authenticate_user!

  def create
    respond_to do |format|
      format.json do
        section = (params[:parent_id] ? Section.children_of(params[:parent_id]) : Section).new(section_params)

        section.resume = Resume.find(params[:resume_id])

        if section.save
          render json: section
        else
          render json: {message: section.errors.full_messages}, status: :bad_request
        end
      end
    end
  end

  def update
    respond_to do |format|
      format.json do
        section = Section.find(params[:id])
        if section.update_attributes(section_params)
          head :ok
        end
      end
    end
  end

  def destroy
    respond_to do |format|
      format.json do
        section = Section.find(params[:id])
        if section.destroy
          head :ok
        end
      end
    end
  end

  def reorder
    respond_to do |format|
      format.json do
        # TODO: performance refactor
        params[:ordered_sections].to_a.each_with_index do |section, index|
          section = Section.find(section[:id])
          section.update_attributes!(weight: index + 1)
        end
        head :ok
      end
    end
  end

  private

  def section_params
    params.require(:section).permit(:title)
  end

end
