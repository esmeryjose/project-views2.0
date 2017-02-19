module UsersHelper

  def has_quote?(user)
    user.quote.nil? || user.quote.empty? ? "--no quote--" : user.quote
  end

  def associating_hash(relation, associating_user)
    # if the user click the decline or cancel request button
    if relation == "Decline" || relation == "Cancel Request"
      current_user.follower_requests.delete(associating_user)
      relation == "Decline"?  "followed denied" : "request was cancelled"

    # if the user click the follow
    elsif relation == "Follow"
      Follow.associating_users(current_user,associating_user)
      "request was sent"

    # else the user is accepting the following request
    elsif relation == "Accept"
      Follow.complete_association(current_user, associating_user)
      "followed approved"

    end
  end

end
