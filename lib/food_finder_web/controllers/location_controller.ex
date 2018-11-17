# inspired by: https://github.com/NatTuck/husky_shop_spa/commit/0fbecf892b0c87febc901882515008546fbee365


defmodule FoodFinderWeb.LocationController do
  use FoodFinderWeb, :controller

  action_fallback FoodFinderWeb.FallbackController

  alias FoodFinder.Users.User
  # %{"location" => location}
  def index(conn, _params) do
    # location has two keys:
    # lat
    # long
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
    #<> "input=food&"
    #<> "inputtype=textquery&"
    <> "location=42.339806,-71.089172&"
    <> "radius=2000&"
    <> "keyword=food&"


    <> "key=placeholder"

    IO.inspect(url)

    case HTTPoison.get(url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        conn
        |> put_resp_header("content-type", "application/json; charset=utf-8")
        |> send_resp(:created, Jason.encode!(%{data: body}))
      {:ok, %HTTPoison.Response{status_code: 404}} ->
        IO.puts "Not found :("
      {:error, %HTTPoison.Error{reason: reason}} ->
        IO.inspect reason
    end
  end  
  """
    with %User{} = user <- FoodFinder.Users.get_and_auth_user(email, password) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(FoodFinderWeb.Endpoint, "user_id", user.id),
          user_id: user.id,
          user_name: user.name
        }
      }
      conn
      |> put_resp_header("content-type", "application/json; charset=utf-8")
      |> send_resp(:created, Jason.encode!(resp))
    end
  end
  """
end
