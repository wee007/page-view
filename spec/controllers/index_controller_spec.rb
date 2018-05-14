require 'rails_helper'

RSpec.describe PageViewController, type: :controller do
  describe "GET #index" do
    it "returns http success and renders index template" do
      get :index

      expect(response).to have_http_status(:success)
      expect(response).to render_template(:index)
    end
  end
end
