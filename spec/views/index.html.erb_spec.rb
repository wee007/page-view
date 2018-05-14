require 'rails_helper'

RSpec.describe "page_view/index.html.erb", type: :view do
  describe "rendering the index template" do
    it "displays the index page" do
      render
      expect(rendered).to match /PageView/
    end
  end
end
