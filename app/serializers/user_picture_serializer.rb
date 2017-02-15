class UserPictureSerializer < ActiveModel::Serializer
  attributes :id, :title, :location, :tags, :avatar, :user

end
