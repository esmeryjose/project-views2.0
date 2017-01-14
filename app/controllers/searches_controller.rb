class SearchesController < ApplicationController

  def new
    # if !params[:type].empty?
    #   @pictures = Picture.by_location(params[:type])
    #   render "pictures/index", alert: "Invalid Search"
    # else
    #   redirect_to user_path(current_user)
    # end

    # if params[:type] == "location"
    #   binding.pry
    #   @pictures = Picture.by_location(params[:type])
    #   render "pictures/index", alert: "Invalid Search"
    # elsif params[:type] == "user"
    #
    # elsif params[:type] == "tag"
    #
    # else
    #   redirect_to user_path(current_user)
    # end

  end

  def searchPicture
    binding.pry
    @search = find_search(params[:type],params[:search])
    if @search
      render json: @search
    else
      render json: {"#{params[:search]}": "does not exist" }, status: 422
    end

  end

  private

  def find_search(typeParams,searchParams)
    case searchParams
    when "Location"
      @searchParams = Location.find_by(title: typeParams)
    when "User"
      @searchParams = User.find_by(name: typeParams)
    when "Tag"
      @searchParams = Tag.find_by(title: typeParams)
    end
  end
end
