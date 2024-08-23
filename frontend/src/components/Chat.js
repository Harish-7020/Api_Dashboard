// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import './Chat.css';

// const Chat = ({ token }) => {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [recipientId, setRecipientId] = useState('');
//   const [userId, setUserId] = useState('');
//   const [username, setUsername] = useState(''); 
//   const [users, setUsers] = useState([]); 

//   useEffect(() => {
//     const storedUsername = localStorage.getItem('username');
//     setUsername(storedUsername || '');

//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/users', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const userList = response.data;

//         const currentUser = userList.find(user => user.username === storedUsername);
//         setUserId(currentUser ? currentUser.id : '');

//         const filteredUsers = userList.filter(user => user.username !== storedUsername);
//         setUsers(filteredUsers);
//       } catch (error) {
//         console.error('Failed to fetch users:', error);
//       }
//     };

//     fetchUsers();

//     const newSocket = io('http://localhost:3000', {
//       auth: {
//         token: `Bearer ${token}`,
//       },
//     });

//     setSocket(newSocket);

//     newSocket.on('message', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => newSocket.close();
//   }, [token]);

//   const sendMessage = async () => {
//     if (inputMessage && recipientId) {
//       try {
//         const response = await axios.post(
//           'http://localhost:3000/messages/direct',
//           {
//             senderId: userId,
//             receiverId: recipientId,
//             message: inputMessage,
//           },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         // Assuming the API response contains the message object
//         const sentMessage = response.data;
//         setMessages([...messages, sentMessage]);
//         setInputMessage('');
//       } catch (error) {
//         console.error('Failed to send message:', error);
//       }
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-sidebar">
//         <h3>Users</h3>
//         <ul>
//           {users.map(user => (
//             <li key={user.id} onClick={() => setRecipientId(user.id)}>
//               {user.username}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="chat-main">
//         <div className="chat-header">
//           <h3>Chat with {recipientId ? users.find(user => user.id === recipientId)?.username : 'users'}</h3>
//         </div>
//         <div className="chat-body">
//           <div className="messages">
//             {messages.map((msg, index) => (
//               <div key={index} className={`chat-message ${msg.senderId === userId ? 'sent' : 'received'}`}>
//                 <strong>{msg.senderId === userId ? 'You' : users.find(user => user.id === msg.senderId)?.username}:</strong>
//                 {msg.message}
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="chat-footer">
//           <input
//             type="text"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             placeholder="Type a message..."
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;

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
  const [username, setUsername] = useState(''); 
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    setUsername(storedUsername || '');

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userList = response.data;

        const currentUser = userList.find(user => user.username === storedUsername);
        setUserId(currentUser ? currentUser.id : '');

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

  const sendMessage = async () => {
    if (inputMessage && recipientId) {
      console.log('Sending message to recipient:', recipientId);
      console.log('Message:', inputMessage);
      console.log('Sender ID:', userId);
  
      try {
        const response = await axios.post(
          'http://localhost:3000/messages/direct',
          {
            senderId: userId,
            receiverId: recipientId,
            message: inputMessage,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        const sentMessage = response.data;
        console.log('Message sent:', sentMessage);
        setMessages([...messages, sentMessage]);
        setInputMessage('');
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    } else {
      console.log('Message or recipient ID is missing.');
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
                <strong>{msg.senderId === userId ? 'You' : users.find(user => user.id === msg.senderId)?.username}:</strong>
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
