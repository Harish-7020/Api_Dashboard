// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import ApiUsageDashboard from './components/ApiUsageDashboard';
// import Login from './components/Login';
// import Chat from './components/Chat';
// import './App.css';

// const App = () => {
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [username, setUsername] = useState(localStorage.getItem('username') || '');

//   const handleLogin = (jwtToken, username) => {
//     setToken(jwtToken);
//     setUsername(username);
//     localStorage.setItem('token', jwtToken);
//     localStorage.setItem('username', username);
//   };

//   const handleLogout = () => {
//     setToken('');
//     setUsername('');
//     localStorage.removeItem('token');
//     localStorage.removeItem('username');
//   };

//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <h1>Welcome, {username}!</h1>
//           {token && (
//             <button onClick={handleLogout}>Logout</button>
//           )}
//         </header>
//         <main>
//           <Routes>
//             <Route path="/" element={token ? <Navigate to="/options" /> : <Login onLogin={handleLogin} />} />
//             <Route path="/options" element={token ? <Options username={username} /> : <Navigate to="/" />} />
//             <Route path="/api-usage" element={token ? <ApiUsageDashboard /> : <Navigate to="/" />} />
//             <Route path="/chat" element={token ? <Chat token={token} /> : <Navigate to="/" />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// };

// const Options = ({ username }) => (
//   <div className="options-container">
//     <h2>Hello, {username}! Please select an option:</h2>
//     <div className="options">
//       <button onClick={() => window.location.href = '/api-usage'}>API Usage Dashboard</button>
//       <button onClick={() => window.location.href = '/chat'}>Chat Application</button>
//     </div>
//   </div>
// );

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ApiUsageDashboard from './components/ApiUsageDashboard';
import Login from './components/Login';
import Chat from './components/Chat';
import './App.css';

const App = () => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');
  const [username, setUsername] = useState(sessionStorage.getItem('username') || '');

  const handleLogin = (jwtToken, username) => {
    setToken(jwtToken);
    setUsername(username);
    sessionStorage.setItem('token', jwtToken);
    sessionStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setToken('');
    setUsername('');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome, {username}!</h1>
          {token && (
            <button onClick={handleLogout}>Logout</button>
          )}
        </header>
        <main>
          <Routes>
            <Route path="/" element={token ? <Navigate to="/options" /> : <Login onLogin={handleLogin} />} />
            <Route path="/options" element={token ? <Options username={username} /> : <Navigate to="/" />} />
            <Route path="/api-usage" element={token ? <ApiUsageDashboard /> : <Navigate to="/" />} />
            <Route path="/chat" element={token ? <Chat token={token} /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const Options = ({ username }) => (
  <div className="options-container">
    <h2>Hello, {username}! Please select an option:</h2>
    <div className="options">
      <button onClick={() => window.location.href = '/api-usage'}>API Usage Dashboard</button>
      <button onClick={() => window.location.href = '/chat'}>Chat Application</button>
    </div>
  </div>
);

export default App;
