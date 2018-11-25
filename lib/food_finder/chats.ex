defmodule FoodFinder.Chats do
  import Ecto.Query, warn: false
  alias FoodFinder.Repo

  alias FoodFinder.Chat

  def new do
    sampleMessage = %{"sender": "Ashwin", "receiver": "NotAshwin", "comment": "Hello There"}
    %{
      messages: [sampleMessage, sampleMessage]
    }
  end

  def client_view(lobby) do
    %{
      messages: lobby.messages
    }
  end

  def send_message(payload) do
    Chat.changeset(%Chat{}, payload) |> Repo.insert
  end

  def get_messages() do
    Repo.all(Chat) # we need to filter it here first though.
  end
end

