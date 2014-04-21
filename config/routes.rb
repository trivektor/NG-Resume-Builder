AngularResumeBuilder::Application.routes.draw do
  devise_for :users
  namespace :api do
    resources :resumes
  end
  get '/dashboard' => 'dashboard#index'
  get '/resumes' => 'resumes#index'
  get '/resumes/:id/edit' => 'resumes#edit'
  root to: 'home#index'
end
