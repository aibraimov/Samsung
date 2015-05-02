class UserAttribute < ActiveRecord::Base

  belongs_to :user
  belongs_to :attribute_type
  has_many :product_attributes, dependent: :destroy


  validates :title, presence: true, length: { maximum: 255 }

end
