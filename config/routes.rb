Rails.application.routes.draw do

  resources :follows
  resources :locations
  resources :tags
  resources :comments
  resources :pictures, except: [:show]
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  resources :users do
    resources :pictures, only: [:show, :index]
  end

  resources :searches, only: [:index]

  post '/users/:id/association', to: 'users#association'
  get '/users/:id/follower_requests', to: 'users#follower_requests', as: "request"
  post '/searchPicture', to: 'searches#searchPicture'
end
