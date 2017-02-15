class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :quote, :email, :current_user_id
  has_many :pictures, serializer: UserPictureSerializer

  def current_user_id
    current_user.id
  end

end
