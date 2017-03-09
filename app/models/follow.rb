class Follow < ApplicationRecord
  # belongs_to :followed, :class_name => "User", foreign_key: 'user_id', optional: true
  # belongs_to :followees, :class_name => "User", foreign_key: 'following_id', optional: true

  belongs_to :follower, foreign_key: 'user_id', class_name: 'User'
  belongs_to :following, foreign_key: 'following_id', class_name: 'User'

  def self.associating_users(myself,associating_user)
    Follow.create(user_id: myself.id, following_id: associating_user.id, request: false)
  end

  def self.complete_association(myself, associating_user)
    relation = Follow.where(user_id: associating_user.id, following_id: myself.id).first
    if relation
      relation.update(request: true)
      "followed approved"
    else
      nil
    end

  end
end
