defmodule FoodFinderWeb.FriendController do
  use FoodFinderWeb, :controller

  alias FoodFinder.Friends
  alias FoodFinder.Friends.Friend

  action_fallback FoodFinderWeb.FallbackController

  def index(conn, _params) do
    friends = Friends.list_friends()
    render(conn, "index.json", friends: friends)
  end

  def create(conn, %{"friend" => friend_params}) do
    with {:ok, %Friend{} = friend} <- Friends.create_friend(friend_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.friend_path(conn, :show, friend))
      |> render("show.json", friend: friend)
    end
  end

  def show(conn, %{"id" => id}) do
    friend = Friends.get_all_friends_of(id)
    render(conn, "show.json", friend: friend)
  end

  def delete(conn, %{"id" => id, "friend_id" => id2}) do
    friend = Friends.get_friend_relationship(id, id2)

    with {:ok, %Friend{}} <- Friends.delete_friend(friend) do
      send_resp(conn, :no_content, "")
    end
  end
end
