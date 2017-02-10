class UsersController < ApplicationController
  before_action :user_attr, only:[:show]
  def index
    # @users = User.all
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

  private

  def user_attr
    @user = User.find_by(id: params[:id])
    @picture = Picture.new
    @location = Location.new(title:"", address:"")
  end
end
