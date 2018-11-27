defmodule FoodFinder.Ratings.Rating do
  use Ecto.Schema
  import Ecto.Changeset


  schema "ratings" do
    field :name, :string
    field :comment_text, :string
    field :rating_number, :integer
    field :restaurant_id, :string
    belongs_to :user, FoodFinder.Users.User

    timestamps()
  end

  @doc false
  def changeset(rating, attrs) do
    rating
    |> cast(attrs, [:restaurant_id, :rating_number, :comment_text, :user_id, :name])
    |> validate_required([:restaurant_id, :rating_number, :comment_text, :name])
  end
end
