defmodule FoodFinder.Repo.Migrations.CreateChat do
  use Ecto.Migration

  def change do
    create table(:chat) do
      add :sender, :integer
      add :receiver, :integer
      add :comment, :text

      timestamps()
    end

  end
end
