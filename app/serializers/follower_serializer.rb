class FollowerSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :follow_request_id, :request
end
