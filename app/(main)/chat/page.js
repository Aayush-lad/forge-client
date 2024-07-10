"use client";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { ChatList, MessageBox, Input } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { useUser } from "context/UserContext";
import EmojiPicker from "emoji-picker-react";
import Loader from "@/components/ui/Loader";

const socket = io(process.env.NEXT_PUBLIC_API_URL);

socket.on("connected", () => {
  console.log("Connected to server");
});

const App = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { userinfo } = useUser();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/chat/chat-rooms`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChatRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms:", error.message);
      }
    };
    fetchChatRooms();

    socket.on("receiveMessage", (message) => {
    
      if (message.senderId) {
        message.sender = message.senderId;
      }


      if (
        currentRoom &&
        (message?.chatRoomId == currentRoom._id ||
          message?.chatRoom == currentRoom._id)
      ) {
   
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [currentRoom, userinfo]);

  useEffect(() => {
    if (currentRoom) {
      fetchMessages(currentRoom._id);
      socket.emit("joinRoom", { chatRoomId: currentRoom._id });
    }
  }, [currentRoom]);

  const fetchMessages = async (chatRoomId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/chat/${chatRoomId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error.message);
    }
  };

  const joinRoom = (room) => {
    setCurrentRoom(room);
  };

  const sendMessage = async () => {

  
    if (currentRoom && (newMessage.trim() || selectedFile)) {
      let messageData = {
        chatRoomId: currentRoom._id,
        senderId: userinfo?._id,
        content: newMessage,
        type: "text",
      };

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
          const token = localStorage.getItem("token");
          if (!token) {
          }
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/upload/${currentRoom._id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          
          messageData.content = response.data.url;
          messageData.type = response.data.type;
        } catch (error) {
          console.error("Error uploading file:", error);
          return;
        }
      }

      socket.emit("sendMessage", messageData);
      setNewMessage("");
      setSelectedFile(null);
    } else {
      console.error("No chat room selected or message is empty.");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onEmojiClick = (emojiData, event) => {
    setNewMessage(newMessage + emojiData.emoji);
  };

  if (!userinfo) {
    return <Loader />;
  }

  // if no chatrooms
  if (!chatRooms.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        No chat rooms found. Chats are automatically created when you join a
        project or a team
      </div>
    );
  }

  return (
    <div className="flex flex-grow min-h-[600px]  max-h-[600px]">
      <div className="border-r border-gray-200">
        <ChatList
          className="chat-list"
          dataSource={chatRooms.map((room) => ({
            avatar:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKxtKSb3vf-G4BMJSDRfZOV3YFn2GvfA0gUw&s",
            alt: room.name,
            title: room.name,
            subtitle: room.lastMessage || "",
            date: new Date(room.updatedAt),
            unread: 0,
            style: {
              backgroundColor:
                currentRoom && currentRoom._id === room._id ? "blue" : "white",
            },
            ...room,
          }))}
          onClick={(room) => joinRoom(room)}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <MessageBox
              key={index}
              position={msg.sender === userinfo?._id ? "right" : "left"}
              type={
                msg.type === "image"
                  ? "photo"
                  : msg.type === "file"
                  ? "file"
                  : "text"
              }
              text={
                msg.type === "image" ? (
                  <img src={msg.content} alt="sent image" />
                ) : msg.type === "file" ? (
                  <a
                    href={msg.content}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {msg.content.substr(59)}
                  </a>
                ) : (
                  msg.content
                )
              }
              data={
                msg.type === "file" && {
                  uri: msg.content,
                  status: {
                    click: false,
                    loading: 0,
                  },
                }
              }
              date={new Date(msg.timestamp)}
            />
          ))}
        </div>
        <div className="p-3 border-t border-gray-200 max-w-4xl">
          <div className="flex items-center">
            <label htmlFor="file-input" className="mr-2 cursor-pointer">
              📎
              <input
                id="file-input"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <div>
              {showEmojiPicker && (
                <div className="absolute bottom-[150px]">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rightButtons={
                <button
                  className="bg-blue-500 text-white px-2 py-2 rounded"
                  onClick={sendMessage}
                >
                  Send
                </button>
              }
              leftButtons={
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  😊
                </button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
