import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = ({ chatRoomId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socket = io('${process.env.NEXT_PUBLIC_API_URL}'); // Adjust the URL as needed

  useEffect(() => {
    if (!chatRoomId) return;

    socket.emit('joinRoom', { chatRoomId });

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [chatRoomId]);

  const handleSendMessage = () => {
    if (!chatRoomId) return;
    socket.emit('sendMessage', { chatRoomId, senderId: userId, content: input });
    setInput('');
  };

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message._id}>{message.content}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
