AngularResumeBuilder::Application.routes.draw do
  devise_for :users
  get '/dashboard' => 'dashboard#index'
  root to: 'home#index'
end
