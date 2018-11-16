defmodule FoodFinder.Ratings.Rating do
  use Ecto.Schema
  import Ecto.Changeset


  schema "ratings" do
    field :comment_text, :string
    field :rating_number, :integer
    field :restaurant_id, :integer
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(rating, attrs) do
    rating
    |> cast(attrs, [:restaurant_id, :rating_number, :comment_text])
    |> validate_required([:restaurant_id, :rating_number, :comment_text])
  end
end
