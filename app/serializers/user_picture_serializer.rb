class UserPictureSerializer < ActiveModel::Serializer
  attributes :id, :title, :location, :tags, :avatar, :user, :created_at

end
