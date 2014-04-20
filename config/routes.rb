AngularResumeBuilder::Application.routes.draw do
  devise_for :users
  resources :resumes, except: [:new, :edit, :show]
  get '/dashboard' => 'dashboard#index'
  get '*resumes' => 'resumes#index'
  root to: 'home#index'
end
