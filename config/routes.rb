AngularResumeBuilder::Application.routes.draw do
  devise_for :users
  namespace :api do
    resources :resumes do
      resources :sections do
        resources :fields, only: [:create, :destroy, :update]
        collection do
          post :reorder
        end
      end
    end
  end

  resources :resumes, only: [:index, :edit, :show]

  namespace :linkedin do
    get '/auth' => 'auth#index'
    get '/auth/callback' => 'auth#callback'
  end

  root to: 'home#index'
end
