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
      # join_table_row = Follow.where(user_id: current_user.id, following_id: user.id)
      # if !join_table_row.empty?
      #   if join_table_row.first.request
      #     {availability:"following", user: user}
      #   else
      #     {availability:"resquest sent", user: user}
      #   end
      # else
      #   # you have not sent a request and you are not following
      #   {availability:"not following", user: user}
      # end
    end
  end
end
