defmodule FoodFinderWeb.Router do
  use FoodFinderWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", FoodFinderWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/register", PageController, :register
    get "/main-page", PageController, :mainPage

  end

  # Other scopes may use custom stacks.
  scope "/api/v1", FoodFinderWeb do
     pipe_through :api

     resources "/sessions", SessionController, only: [:create]
     resources "/users", UserController

   end
end
