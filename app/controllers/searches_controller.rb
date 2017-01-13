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
    
  end
end
