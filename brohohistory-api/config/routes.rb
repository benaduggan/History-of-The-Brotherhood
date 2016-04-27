Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :enduser

  resources :floor

  resources :person

  resources :person_position

  resources :person_room

  resources :picture

  resources :position

  resources :room

  post 'login', to: 'enduser#login'
  delete 'logout', to: 'enduser#logout'
end
