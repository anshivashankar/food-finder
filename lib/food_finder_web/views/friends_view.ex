defmodule FoodFinderWeb.FriendView do
  use FoodFinderWeb, :view
  alias FoodFinderWeb.FriendView

  def render("friends.json", %{friends: friends}) do
    %{data: render_many(friends, FriendView, "friend.json")}
  end

  def render("show.json", %{friend: friend}) do
    %{data: render_one(friend, FriendView, "friend.json")}
  end

  def render("friend.json", %{friend: friend}) do
    %{id: friend.id,
      primary_user_id: friend.primary_user_id,
      secondary_user_id: friend.secondary_user_id}
  end
end
