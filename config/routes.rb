Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/page_view', to: 'page_view#index'
  root to: 'page_view#index'
end
