class UsersController < ApplicationController
  before_action :user_attr, only:[:show]

  def views
    ids = helpers.following_picture_ids
    if params[:id]
      @pictures = Picture.picture_collector(ids).most_recent
    end
    respond_to do |f|
      f.html { render :views }
      f.json { render json: @pictures }
    end
  end

  def show
    respond_to do |f|
      f.html { render :show }
      if @user
        f.json { render json: @user }
      else
        f.json { render json: {user: "does not exist"}, status: 422}
      end
    end
  end

  def follower_requests
    @follower_requests = current_user.follower_requests
    respond_to do |f|
      f.html { render :follower_requests }
      f.json { render json: @follower_requests}
    end
  end

  def association
    associating_user = User.find_by(id: params[:otherUserId])
    response = {}
    response[:user] = helpers.associating_hash(params[:relation], associating_user)
    render json: response
  end

  private

  def user_attr
    @user = User.find_by(id: params[:id])

    @picture = Picture.new
    @location = Location.new(title:"", address:"")
  end
end
