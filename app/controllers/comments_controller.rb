class CommentsController < ApplicationController

  def create
    params[:comments][:user_id] = current_user.id
    comment = Comment.create(comment_params)
    if comment.save
      render json: comment
    else
      render json: comment.errors.messages, status: 422
    end
  end

  private
  def comment_params
    params.require(:comments).permit(:content, :picture_id, :user_id)
  end

end
