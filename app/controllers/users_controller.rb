class UsersController < ApplicationController
  before_action :set_user, only:[:show]
  def index
    @users = User.all
  end

  def show
    @picture = Picture.new
    # @pictures = current_user.pictures

    # respond_to do |f|
    #   f.html { render :show }
    #   f.json { render json: @user}
    # end
  end

  private

  def set_user
    @user = User.find_by(id: params[:id])
  end
end
