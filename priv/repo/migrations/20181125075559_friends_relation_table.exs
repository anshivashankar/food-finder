defmodule FoodFinder.Repo.Migrations.FriendsRelationTable do
  use Ecto.Migration

  def change do
    create table(:friends_with) do
      timestamps()
    end
    alter table(:friends_with) do
      add :primary_user_id, references(:users), null: false
      add :secondary_user_id, references(:users), null: false
    end
  end
end
