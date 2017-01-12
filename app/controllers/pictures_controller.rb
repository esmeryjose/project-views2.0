class PicturesController < ApplicationController
  before_action :set_picture, only: [:edit, :update, :show, :destroy]

  def index
    if params[:user_id]
      @pictures = Picture.most_recent.where({user_id: params[:user_id]})
    else
      @pictures = Picture.most_recent
    end
    respond_to do |f|
      f.html { render :index }
      f.json { render json: @pictures }
    end

  end

  def create
    @picture = Picture.new(picture_params)
    if helpers.both_location?(picture_params)
      @picture.errors.messages[:bad_location] = ["Can only choose one location"]
    end
    # if @picture.errors.any?
    #   @pictures = current_user.pictures
    #   render "users/show"
    # else
    if @picture.save
      render json: @picture
    else
      # render json: errors: @picture.errors.messages, status: 422
      render json: @picture.errors.messages, status: 422
    end

  end

  def show
  end

  def edit
  end

  def update
    @picture.update(picture_params)
    redirect_to user_path(current_user)
  end

  def destroy
    @picture.destroy
    redirect_to user_path(current_user)
  end

  private

  def set_picture
    @picture = Picture.find_by(id: params[:id])
  end

  def picture_params
    params.require(:picture).permit(:title, :avatar, :user_id, :location_id, tag_ids:[],
                  location_attributes:[:title, :address], tags_attributes: [:title])
  end
end
