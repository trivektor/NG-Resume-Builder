AngularResumeBuilder::Application.routes.draw do
  devise_for :users
  namespace :api do
    resources :resumes
  end
  get '/dashboard' => 'dashboard#index'
  get '*resumes' => 'resumes#index'
  root to: 'home#index'
end
