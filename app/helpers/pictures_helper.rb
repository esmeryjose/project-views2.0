module PicturesHelper
  def both_location?(params)
    !params[:location_attributes].values.join("").empty? && !params[:location_id].empty?
  end

  def count_errors(picture)
    location_errors = 0
    if picture.location
      location_errors = picture.location.errors.count
    end
    pluralize(picture.errors.count + location_errors, "error")
  end

end
