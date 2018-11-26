defmodule FoodFinderWeb.RatingView do
  use FoodFinderWeb, :view
  alias FoodFinderWeb.RatingView

  def render("index.json", %{ratings: ratings}) do
    %{data: render_many(ratings, RatingView, "rating.json")}
  end

  def render("show.json", %{rating: rating}) do
    %{data: render_one(rating, RatingView, "rating.json")}
  end

  def render("rating.json", %{rating: rating}) do
    %{id: rating.id,
      user_id: rating.user_id,
      name: rating.name,
      restaurant_id: rating.restaurant_id,
      rating_number: rating.rating_number,
      comment_text: rating.comment_text}
  end
end
