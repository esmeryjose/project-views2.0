class Picture < ApplicationRecord
  mount_uploader :avatar, AvatarUploader
  has_many :tags, through: :picture_tags
  has_many :picture_tags
  has_many :comments, dependent: :destroy
  belongs_to :user
  belongs_to :location
  validates :avatar, presence: :true

  scope :by_location, -> location {all.select{|pic| pic.location.title == location}}
  scope :most_recent, -> { order(created_at: :asc)}


  def location_attributes=(attributes)
    if attributes[:title] != "" && attributes[:address] != ""
      if self.location
        self.errors.messages[:bad_location] = ["can only choose one location"]
      else
        self.location = Location.find_or_create_by(attributes)
      end
    elsif one_blank(attributes)
      self.errors.messages[:bad_location] = ["location must contain a title and an address"]
    end
  end

  def tags_attributes=(attributes)
    if !attributes["0"].values.include?("")
      attributes.values.each do |key|
        self.tags << Tag.find_or_create_by(key)
      end
    end
  end

  def one_blank(attributes)
    if (attributes[:title] != "" && attributes[:address] == "") ||
      (attributes[:title] == "" && attributes[:address] != "")
      true
    else
      false
    end
  end

end
