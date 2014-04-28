class Api::FieldsController < ApplicationController

  before_action :authenticate_user!
  before_action :find_resume, :find_section

  def create
    respond_to do |format|
      format.json do
        field = @section.fields.build(field_params)
        if field.save
          render json: field
        else
          render json: {message: field.errors.full_messages}
        end
      end
    end
  end

  def update
    respond_to do |format|
      format.json do
        field = @section.fields.where(id: params[:id]).first
        if field.update_attributes(field_params)
          head :ok
        else
          render json: {message: field.errors.full_messages}
        end
      end
    end
  end

  def destroy
    respond_to do |format|
      format.json do
        field = @section.fields.where(id: params[:id]).first
        if field.destroy
          head :ok
        end
      end
    end
  end

  private

  def field_params
    params.require(:field).permit(:name, :value)
  end

  def find_resume
    @resume = Resume.find(params[:resume_id])
  end

  def find_section
    @section = @resume.sections.where(id: params[:section_id]).first
  end

end
