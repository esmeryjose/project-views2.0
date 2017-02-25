class PictureCommentSerializer < ActiveModel::Serializer
  attributes :id,:user, :picture, :content
end
