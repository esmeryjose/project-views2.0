class SearchesController < ApplicationController

  def new
  end

  def searchPicture
    @search = helpers.find_search(params[:type],params[:search])
     if !@search.empty?
      render json: @search
    else
      render json: {"#{params[:type]}": "does not exist"} , status: 422
    end
  end

end
