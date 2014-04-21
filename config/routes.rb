AngularResumeBuilder::Application.routes.draw do
  devise_for :users
  namespace :api do
    resources :resumes do
      resources :sections
    end
  end
  get '/dashboard' => 'dashboard#index'
  get '/resumes' => 'resumes#index'
  get '/resumes/:id/edit' => 'resumes#index'
  root to: 'home#index'
end
