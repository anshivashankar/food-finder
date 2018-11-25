# Inspired by: http://www.ccs.neu.edu/home/ntuck/courses/2018/09/cs4550/notes/06-channels/notes.html
defmodule FoodFinderWeb.ChatChannel do
  use FoodFinderWeb, :channel

  alias FoodFinder.Chats

  def join("chat:"  <> name, payload, socket) do
    if authorized?(payload) do
      lobby = Chats.new()
      socket = socket
      |> assign(:chat, lobby)
      |> assign(:name, name)
      {:ok, %{"join" => name, "chat" => Chats.client_view(lobby)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (chat:lobby).
  def handle_in("message", payload, socket) do
    Chats.send_message(payload)
    chats = Chats.get_messages()
    socket = assign(socket, :chat, chats)
    {:reply, {:ok, %{ "chat" => Chats.client_view(chats)}}, socket}
    #broadcast socket, "message", payload
    #{:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
