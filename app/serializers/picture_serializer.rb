class PictureSerializer < ActiveModel::Serializer
  attributes :id, :title, :avatar
  belongs_to :location
  belongs_to :user
  has_many :tags
end
