class PictureSerializer < ActiveModel::Serializer
  attributes :id, :title, :avatar, :created_at
  belongs_to :location
  belongs_to :user
  has_many :tags
  has_many :comments, serializer: PictureCommentSerializer

end
