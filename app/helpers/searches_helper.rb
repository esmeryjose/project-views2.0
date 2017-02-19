module SearchesHelper
  def dataParser(data)
    data.map do |user|
      if current_user.following.include?(user)
        {availability:"following", user: user}
      elsif current_user.pending.include?(user)
        {availability:"resquest sent", user: user}
      else
        {availability:"not following", user: user}
      end
    end
  end

  def find_search(typeParams,searchParams)
    search = "%#{typeParams}%"
    case searchParams
    when "Location"
      @searchParams = Location.where("title LIKE ?", search)
    when "User"
      # search = "%#{typeParams}%"
      @searchParams = User.where("name LIKE ?", search)
      dataParser(@searchParams)
    when "Tag"
      # search = "%#{typeParams}%"
      @searchParams = Tag.where("title LIKE ?", search)
    end
  end
end
