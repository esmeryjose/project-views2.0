class UsersController < ApplicationController
  before_action :set_user, only:[:show]
  def index
    @users = User.all
  end

  def show
    @picture = Picture.new
    # @pictures = current_user.pictures
    if @user
      respond_to do |f|
        f.html { render :show }
        f.json { render json: { user: @user, currentUserId: current_user.id} }
      end
    else
      respond_to do |f|
        f.html { render :show }
        f.json { render json: {user: "does not exist"}, status: 422}
      end
    end
  end

  private

  def set_user
    @user = User.find_by(id: params[:id])
  end
end
