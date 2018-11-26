defmodule FoodFinderWeb.PageController do
  use FoodFinderWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def register(conn, _params) do
    render conn, "register.html"
  end

  def mainPage(conn, _params) do
    render conn, "main-page.html"
  end

  def profile(conn, _params) do
    ratings = FoodFinder.Ratings.list_ratings()
    |> Enum.map(&(Map.take(&1, [:user_id, :name, :comment_text, :rating_number, :restaurant_id])))
    render conn, "profile.html", ratings: ratings
  end

  def chat(conn, params) do
    render conn, "chat.html", game: params["chat"]
  end

  def restaurant(conn, _params) do 
    render conn, "restaurant.html"
  end

end
