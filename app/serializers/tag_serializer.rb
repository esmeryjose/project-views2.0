class TagSerializer < ActiveModel::Serializer
  attributes :id, :title
  has_many :pictures, serializer: TagPictureSerializer
end
