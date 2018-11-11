use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :food_finder, FoodFinderWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :food_finder, FoodFinder.Repo,
  username: "food_finder",
  password: "ooTh4pheVoh6",
  database: "food_finder_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
