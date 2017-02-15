class LocationSerializer < ActiveModel::Serializer
  attributes :id, :title, :address
  has_many :pictures, serializer: LocationPictureSerializer

end
