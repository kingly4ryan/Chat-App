import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Header from './Components/Header';
import Chat from './Components/Chat';
import Login from './Components/Login';
import Register from './Components/Register';

const socket = io('http://localhost:5000'); // Connect to the Socket.io server

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // Listen for 'message' events from the server
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup function to remove event listener when component unmounts
    return () => {
      socket.off('message');
    };
  }, []);

  const handleLogin = (userData) => {
    // Handle user login here (e.g., send login request to backend)
    setUser(userData);
  };

  const handleRegister = (userData) => {
    // Handle user registration here (e.g., send registration request to backend)
    setUser(userData);
  };

  const handleLogout = () => {
    // Handle user logout here (e.g., clear user data from state)
    setUser(null);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    // Send the message to the server
    socket.emit('message', inputMessage);
    setInputMessage('');
  };

  return (
    <div>
      <Header user={user} onLogout={handleLogout} />
      {user ? (
        <Chat messages={messages} inputMessage={inputMessage} onMessageSubmit={handleMessageSubmit} onInputChange={(e) => setInputMessage(e.target.value)} />
      ) : (
        <>
          <Login onLogin={handleLogin} />
          <Register onRegister={handleRegister} />
        </>
      )}
    </div>
  );
}

export default App;
