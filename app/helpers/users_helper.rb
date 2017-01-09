module UsersHelper

  def has_quote?(user)
    user.quote.nil? || user.quote.empty? ? "--no quote--" : user.quote
  end

end
