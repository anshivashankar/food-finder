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
    render conn, "profile.html"
  end
end
