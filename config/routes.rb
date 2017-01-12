Rails.application.routes.draw do

  resources :locations
  resources :tags
  resources :comments
  resources :pictures, except: [:show, :index]
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  resources :users do
    resources :pictures, only: [:show, :index]
  end

  resources :searches
  root'users#index'
end
