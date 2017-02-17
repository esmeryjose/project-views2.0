class SearchesController < ApplicationController

  def new
  end

  def searchPicture
    @search = find_search(params[:type],params[:search])
    if !@search.empty?
      render json: @search
    else
      render json: {"#{params[:type]}": "does not exist"} , status: 422
    end

  end

  private

  def find_search(typeParams,searchParams)
    search = "%#{typeParams}%"
    case searchParams
    when "Location"
      @searchParams = Location.where("title LIKE ?", search)
    when "User"
      # search = "%#{typeParams}%"
      @searchParams = User.where("name LIKE ?", search)
      helpers.dataParser(@searchParams)
    when "Tag"
      # search = "%#{typeParams}%"
      @searchParams = Tag.where("title LIKE ?", search)
    end
  end
end
