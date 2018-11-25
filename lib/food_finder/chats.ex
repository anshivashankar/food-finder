defmodule FoodFinder.Chats do
  import Ecto.Query, warn: false
  alias FoodFinder.Repo

  alias FoodFinder.Chat

  def new do
    sampleMessage = %{"sender": "Ashwin", "receiver": "NotAshwin", "comment": "Hello There"}
    %{
      messages: [sampleMessage, sampleMessage]
    }
    |> IO.inspect
  end

  def client_view(lobby) do
    lobby
  end

  def send_message(payload) do
    Chat.changeset(%Chat{}, payload) |> Repo.insert
  end

  def get_messages() do
    messages = Repo.all(Chat)
    |> Enum.map(fn x -> Map.drop(Map.from_struct(x), [:__meta__]) end)
    %{
      messages: messages
    }
    |> IO.inspect
    # we need to filter it here first though.
  end
end

