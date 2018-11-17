defmodule FoodFinderWeb.LocationView do
  use FoodFinderWeb, :view
  alias FoodFinderWeb.LocationView

  def render("index.json", location) do
    %{data: %{location: location}}
  end
end
