# Inspired by: http://www.ccs.neu.edu/home/ntuck/courses/2018/09/cs4550/notes/06-channels/notes.html
defmodule FoodFinder.Chat do
  use Ecto.Schema
  import Ecto.Changeset

  schema "chat" do
    field :comment, :string
    field :receiver, :integer
    field :sender, :integer

    timestamps()
  end

  @doc false
  def changeset(chat, attrs) do
    chat
    |> cast(attrs, [:sender, :receiver, :comment])
    |> validate_required([:sender, :receiver, :comment])
  end
end
