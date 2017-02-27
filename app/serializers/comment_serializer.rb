class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content
  belongs_to :picture
  belongs_to :user
end
