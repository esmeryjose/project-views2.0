class Follow < ApplicationRecord
  # belongs_to :followed, :class_name => "User", foreign_key: 'user_id', optional: true
  # belongs_to :followees, :class_name => "User", foreign_key: 'following_id', optional: true

  belongs_to :follower, foreign_key: 'user_id', class_name: 'User'
  belongs_to :following, foreign_key: 'following_id', class_name: 'User'


end
