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
      # search = "%#{typeParams}%"
      # @searchParams = Location.where("title LIKE ?", search)
      @searchParams = Location.find_by(title: typeParams)
    when "User"
      search = "%#{typeParams}%"
      @searchParams = User.where("name LIKE ?", search)
    when "Tag"
      search = "%#{typeParams}%"
      @searchParams = Tag.where("title LIKE ?", search)
    end
  end
end
