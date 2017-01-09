class Tag < ApplicationRecord
  has_many :pictures, through: :picture_tags
  has_many :picture_tags
  validates :title, presence: :true

end
