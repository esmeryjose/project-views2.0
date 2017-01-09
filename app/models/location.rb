class Location < ApplicationRecord
  has_many :pictures
  validates :title, presence: :true
  validates :address, presence: :true
  
end
