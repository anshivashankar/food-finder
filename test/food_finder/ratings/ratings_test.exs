defmodule FoodFinder.RatingsTest do
  use FoodFinder.DataCase

  alias FoodFinder.Ratings

  describe "ratings" do
    alias FoodFinder.Ratings.Rating

    @valid_attrs %{comment_text: "some comment_text", rating_number: 42, restaurant_id: 42}
    @update_attrs %{comment_text: "some updated comment_text", rating_number: 43, restaurant_id: 43}
    @invalid_attrs %{comment_text: nil, rating_number: nil, restaurant_id: nil}

    def rating_fixture(attrs \\ %{}) do
      {:ok, rating} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Ratings.create_rating()

      rating
    end

    test "list_ratings/0 returns all ratings" do
      rating = rating_fixture()
      assert Ratings.list_ratings() == [rating]
    end

    test "get_rating!/1 returns the rating with given id" do
      rating = rating_fixture()
      assert Ratings.get_rating!(rating.id) == rating
    end

    test "create_rating/1 with valid data creates a rating" do
      assert {:ok, %Rating{} = rating} = Ratings.create_rating(@valid_attrs)
      assert rating.comment_text == "some comment_text"
      assert rating.rating_number == 42
      assert rating.restaurant_id == 42
    end

    test "create_rating/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Ratings.create_rating(@invalid_attrs)
    end

    test "update_rating/2 with valid data updates the rating" do
      rating = rating_fixture()
      assert {:ok, %Rating{} = rating} = Ratings.update_rating(rating, @update_attrs)
      assert rating.comment_text == "some updated comment_text"
      assert rating.rating_number == 43
      assert rating.restaurant_id == 43
    end

    test "update_rating/2 with invalid data returns error changeset" do
      rating = rating_fixture()
      assert {:error, %Ecto.Changeset{}} = Ratings.update_rating(rating, @invalid_attrs)
      assert rating == Ratings.get_rating!(rating.id)
    end

    test "delete_rating/1 deletes the rating" do
      rating = rating_fixture()
      assert {:ok, %Rating{}} = Ratings.delete_rating(rating)
      assert_raise Ecto.NoResultsError, fn -> Ratings.get_rating!(rating.id) end
    end

    test "change_rating/1 returns a rating changeset" do
      rating = rating_fixture()
      assert %Ecto.Changeset{} = Ratings.change_rating(rating)
    end
  end
end
