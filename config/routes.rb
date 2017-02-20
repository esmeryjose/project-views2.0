Rails.application.routes.draw do

  resources :comments
  resources :pictures, only: [:create, :edit, :update, :destroy]
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  resources :users, only: [:show] do
    resources :pictures, only: [:show]
  end

  resources :searches, only: [:index]

  get '/users/:id/views', to: 'users#views', as: "views"
  post '/users/:id/association', to: 'users#association'
  get '/users/:id/follower_requests', to: 'users#follower_requests', as: "request"
  post '/searchPicture', to: 'searches#searchPicture'
end
