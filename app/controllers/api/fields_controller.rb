class Api::FieldsController < ApplicationController

  before_action :authenticate_user!

  def create
    respond_to do |format|
      format.json do
        resume = Resume.find(params[:resume_id])
        section = resume.sections.where(id: params[:section_id]).first
        field = section.fields.build(field_params)

        if field.save
          render json: @field
        else
          render json: {message: @field.errors.full_messages}
        end
      end
    end
  end

  private

  def field_params
    params.require(:field).permit(:name, :value)
  end

end
