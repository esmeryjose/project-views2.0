module UsersHelper

  def has_quote?(user)
    user.quote.nil? || user.quote.empty? ? "--no quote--" : user.quote
  end

  def associating_hash(relation, associating_user)

    case relation
    when "Cancel Request"
      current_user.pending.delete(associating_user)
      "request was cancelled"

    when "Decline"
      current_user.follower_requests.delete(associating_user)
      "followed denied"

    when "Follow"
      Follow.associating_users(current_user,associating_user)
      "request was sent"

    when "Accept"
      # we let the Follow return the string in case the user making the request cancels
      # right before the user receiving the request accepts or declines
      Follow.complete_association(current_user, associating_user)

    when "Unfollow"
      current_user.following.delete(associating_user)
      "user unfollowed"
    end
  end


  def following_picture_ids
    ids=[]
    current_user.following.each do |user|
      ids += user.pictures.ids
    end
    ids += current_user.pictures.ids
  end
end
