S62::Application.routes.draw do
  get "contact_email/index"

  get  'video-production'        => 'video_production#index',        as: :video_production_index
  get  'services'                => 'services#index',                as: :services_index
  get  'enterprise-gamification' => 'enterprise_gamification#index', as: :enterprise_gamification_index
  get  'user/experience'         => 'user_experience#index',         as: :user_experience_index
  get  'enterprise-cms'          => 'enterprise_cms#index',          as: :enterprise_cms_index
  get  'mobile'                  => 'mobile#index',                  as: :mobile_index
  get  'contact'                 => 'contact#new',                   as: :contact_index
  get  'about'                   => 'about#index',                   as: :about_index
  get  'work'                    => 'work#index',                    as: :work_index
  get  'digital-marketing'       => 'digital_marketing#index',       as: :digital_marketing_index

  get 'instagram/callback'       => 'instagram#callback'

  post 'contact'                 => 'contact#create',                as: 'contact'

  root to: 'home#index'
end
