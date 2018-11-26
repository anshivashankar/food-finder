# Inspired by: http://www.ccs.neu.edu/home/ntuck/courses/2018/09/cs4550/notes/06-channels/notes.html
defmodule FoodFinderWeb.ChatChannel do
  use FoodFinderWeb, :channel

  alias FoodFinder.Chats

  def join("chat:"  <> name, payload, socket) do
    if authorized?(payload) do
      ids = String.split(name, "+")
      |> Enum.map(fn id -> Integer.parse(id) end)
      |> IO.inspect
      lobby = Chats.get_messages(elem(Enum.at(ids, 0), 0), elem(Enum.at(ids, 1), 0))
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
    chats = Chats.get_messages(payload["sender"], payload["receiver"])
    socket = assign(socket, :chat, chats)
    broadcast socket, "new_view", Chats.client_view(chats)
    #{:reply, {:ok, %{ "chat" => Chats.client_view(chats)}}, socket}
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
