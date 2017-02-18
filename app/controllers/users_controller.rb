class UsersController < ApplicationController
  before_action :user_attr, only:[:show]
  def index
  end

  def show
    if @user
      respond_to do |f|
        f.html { render :show }
        f.json { render json: @user }
      end
    else
      respond_to do |f|
        f.html { render :show }
        f.json { render json: {user: "does not exist"}, status: 422}
      end
    end
  end

  def follower_requests
  end

  def association
    associating_user = User.find_by(id: params[:otherUserId])
    if params[:relation] == "delete"
      current_user.following.delete(associating_user)
      render json: {"user": "was deleted"}
    else
      Follow.create(user_id: current_user.id, following_id: associating_user.id, request: false)
      render json: {"user": "request was sent"}
    end
  end

  private

  def user_attr
    @user = User.find_by(id: params[:id])
    @picture = Picture.new
    @location = Location.new(title:"", address:"")
  end
end
