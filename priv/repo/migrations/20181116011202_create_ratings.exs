defmodule FoodFinder.Repo.Migrations.CreateRatings do
  use Ecto.Migration

  def change do
    create table(:ratings) do
      add :name, :text, null: false
      add :restaurant_id, :integer, null: false
      add :rating_number, :integer, null: false
      add :comment_text, :text
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create index(:ratings, [:user_id])
  end
end
