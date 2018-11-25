defmodule FoodFinder.Repo.Migrations.FriendsRelationTable do
  use Ecto.Migration

  def change do
    create table(:friends_with) do
      add :first_user_id, references(:users), null: false
      add :second_user_id, references(:users), null: false
      timestamps()
    end
  end
end
