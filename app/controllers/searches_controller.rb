class SearchesController < ApplicationController

  def new
  end

  def searchPicture
    @search = find_search(params[:type],params[:search])
    if @search
      render json: @search
    else
      render json: {"#{params[:type]}": "does not exist"} , status: 422
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
