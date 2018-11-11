defmodule FoodFinder.Repo do
  use Ecto.Repo,
    otp_app: :food_finder,
    adapter: Ecto.Adapters.Postgres
end
