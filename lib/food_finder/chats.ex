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

  def get_messages(sender, receiver) do
    query = from c in Chat,
    where: c.sender == ^sender and c.receiver == ^receiver or c.receiver == ^sender and c.sender == ^receiver

    messages = Repo.all(query)
    |> Enum.map(fn x -> Map.drop(Map.from_struct(x), [:__meta__]) end)
    %{
      messages: messages
    }
    |> IO.inspect
  end
end

