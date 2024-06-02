Rails.application.routes.draw do
  get 'site/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: redirect('/todos')

  # ページを表示する用のコントローラへのルーティング
  get 'todos', to: 'site#index'
  get 'todos/new', to: 'site#index'
  get 'todos/:id/edit', to: 'site#index'
  
  # データを返したり処理する用のコントローラへのルーティング
  namespace :api do
    namespace :v1 do
      delete '/todos/destroy_all', to: 'todos#destroy_all'
      resources :todos, only: %i[index show create update destroy]
    end
  end
end
