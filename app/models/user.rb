class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook]
  has_many :comments, through: :pictures
  has_many :pictures, dependent: :destroy
  has_many :follows
  has_many :following, through: :follows, source: :followees
  has_many :followers, through: :follows, source: :user
  #so that you edit your own comments, use scope for this
  # has_many :said_comments, through: :post_pictures, source: :users


  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
     user.email = "Fake@email.com"
     user.password = Devise.friendly_token[0,20]
      # assuming the user model has a name
     user.name = auth.info.name
     # assuming the user model has an image
     #  user.image = auth.info.image
    end
  end


end
