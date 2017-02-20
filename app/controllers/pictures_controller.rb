class PicturesController < ApplicationController
  before_action :set_picture, only: [:edit, :update, :show, :destroy]

  def create
    @picture = Picture.new(picture_params)
    if @picture.errors.any? || !@picture.save
      render json: @picture.errors.messages, status: 422
    else
      @picture.save
      render json: @picture
    end
  end

  def show
  end

  def edit
    respond_to do |f|
      f.html { render :edit }
      f.json { render :edit }
    end
  end

  def update

    @picture.assign_attributes(picture_params)
    if @picture.errors.any? || !@picture.save
      render json: @picture.errors.messages, status: 422
    else
      @picture.save
      render json: @picture
    end
  end

  def destroy
    @picture.destroy
    redirect_to user_path(current_user)
  end

  private

  def set_picture
    @picture = Picture.find_by(id: params[:id])
    if params[:action] == "edit"
      set_location
    end
  end

  def set_location
    @location = @picture.location
  end

  def picture_params
    params.require(:picture).permit(:title, :avatar, :user_id, :location_id, tag_ids:[],
                  location_attributes:[:title, :address], tags_attributes: [:title])
  end
end
