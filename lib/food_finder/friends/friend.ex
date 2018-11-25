# Copied from User and modified by hand. Pray it works.
defmodule FoodFinder.Friends.Friend do
  use Ecto.Schema
  import Ecto.Changeset


  schema "friends_with" do
    field :primary_user_id, :id
    field :secondary_user_id, :id
    timestamps()
  end

  @doc false
  def changeset(friend, attrs) do
    friend
    |> cast(attrs, [:primary_user_id, :secondary_user_id])
    |> validate_required([:primary_user_id, :secondary_user_id])
  end
end
