AngularResumeBuilder::Application.routes.draw do
  devise_for :users
  namespace :api do
    resources :resumes do
      resources :sections do
        resources :fields, only: [:create, :destroy]
        collection do
          post :reorder
        end
      end
    end
  end
  resources :resumes, only: [:index, :edit]
  root to: 'home#index'
end
