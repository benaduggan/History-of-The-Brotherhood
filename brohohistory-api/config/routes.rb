Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :enduser

  resources :floor

  resources :person

  resources :person_position

  resources :person_room
  get '/map/:semester/:year', to: 'person_room#showMap', as: 'showMap'


  resources :picture

  resources :position

  resources :room
end
