import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './Chat.css';

const Chat = ({ token }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState(''); // Store the logged-in username
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || '');

    // Fetch user list
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userList = response.data;

        // Find the user ID based on the username
        const currentUser = userList.find(user => user.username === storedUsername);
        setUserId(currentUser ? currentUser.id : '');

        // Exclude logged-in user from the list
        const filteredUsers = userList.filter(user => user.username !== storedUsername);
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();

    const newSocket = io('http://localhost:3000', {
      auth: {
        token: `Bearer ${token}`,
      },
    });

    setSocket(newSocket);

    newSocket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => newSocket.close();
  }, [token]);

  const sendMessage = () => {
    if (inputMessage && socket && recipientId) {
      socket.emit('message', {
        senderId: userId,
        receiverId: recipientId,
        message: inputMessage,
      });
      setMessages([...messages, { senderId: userId, message: inputMessage }]);
      setInputMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h3>Users</h3>
        <ul>
          {users.map(user => (
            <li key={user.id} onClick={() => setRecipientId(user.id)}>
              {user.username}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-main">
        <div className="chat-header">
          <h3>Chat with {recipientId ? users.find(user => user.id === recipientId)?.username : 'users'}</h3>
        </div>
        <div className="chat-body">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.senderId === userId ? 'sent' : 'received'}`}>
                <strong>{users.find(user => user.id === msg.senderId)?.username}:</strong>
                {msg.message}
              </div>
            ))}
          </div>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
