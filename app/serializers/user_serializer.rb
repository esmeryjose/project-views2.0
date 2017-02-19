class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :quote, :email
  has_many :pictures, serializer: UserPictureSerializer

end
