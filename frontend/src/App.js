// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
// import ApiUsageDashboard from './components/ApiUsageDashboard';
// import Login from './components/Login';
// import Chat from './components/Chat';
// import './App.css';

// const App = () => {
//   const [token, setToken] = useState(sessionStorage.getItem('token') || '');
//   const [username, setUsername] = useState(sessionStorage.getItem('username') || '');

//   const handleLogin = (jwtToken, username) => {
//     setToken(jwtToken);
//     setUsername(username);
//     sessionStorage.setItem('token', jwtToken);
//     sessionStorage.setItem('username', username);
//   };

//   const handleLogout = () => {
//     setToken('');
//     setUsername('');
//     sessionStorage.removeItem('token');
//     sessionStorage.removeItem('username');
//   };

//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <h1>Welcome {username} !!!</h1>
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

// const Options = ({ username }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="options-container">
//       <h2>Hello, {username}! Please select an option:</h2>
//       <div className="options">
//         <button onClick={() => navigate('/api-usage')}>API Usage Dashboard</button>
//         <button onClick={() => navigate('/chat')}>Chat Application</button>
//       </div>
//     </div>
//   );
// };

// export default App;



// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ApiUsageDashboard from './components/ApiUsageDashboard';
// import Login from './components/Login';
// import Chat from './components/Chat';
// import CRUDOperations from './components/CRUDOperations'; // Import the new CRUD component
// import axios from 'axios';
// import './App.css';

// const App = () => {
//   const [token, setToken] = useState(sessionStorage.getItem('token') || '');
//   const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
//   const [metrics, setMetrics] = useState({ cpuUsage: 0, memoryUsage: 0, diskUsage: 0, networkUsage: { rx: 0, tx: 0 } });

//   const handleLogin = (jwtToken, username) => {
//     setToken(jwtToken);
//     setUsername(username);
//     sessionStorage.setItem('token', jwtToken);
//     sessionStorage.setItem('username', username);
//   };

//   const handleLogout = () => {
//     setToken('');
//     setUsername('');
//     sessionStorage.removeItem('token');
//     sessionStorage.removeItem('username');
//   };

//   const fetchSystemMetrics = async (token) => {
//     try {
//       const response = await axios.get('/monitoring', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       if (error.response) {
//         throw new Error(error.response.data.error || error.response.data.message || `Status code: ${error.response.status}`);
//       } else if (error.request) {
//         throw new Error('No response received from the server');
//       } else {
//         throw new Error(`Error: ${error.message}`);
//       }
//     }
//   };

//   useEffect(() => {
//     const checkMetrics = async () => {
//       if (token) {
//         try {
//           const data = await fetchSystemMetrics(token);
//           setMetrics(data);

//           // Set threshold values
//           const cpuThreshold = 80;
//           const memoryThreshold = 2048; 
//           const diskThreshold = 10240; 
//           const networkThreshold = { rx: 10240, tx: 10240 };

//           if (data.cpuUsage > cpuThreshold) {
//             toast.error(`High CPU Usage: ${data.cpuUsage}%`);
//           }
//           if (data.memoryUsage > memoryThreshold) {
//             toast.error(`High Memory Usage: ${data.memoryUsage} MB`);
//           }
//           if (data.diskUsage > diskThreshold) {
//             toast.error(`High Disk Usage: ${data.diskUsage} MB`);
//           }
//           if (data.networkUsage.rx > networkThreshold.rx) {
//             toast.error(`High Network Rx Usage: ${data.networkUsage.rx} MB`);
//           }
//           if (data.networkUsage.tx > networkThreshold.tx) {
//             toast.error(`High Network Tx Usage: ${data.networkUsage.tx} MB`);
//           }
//         } catch (error) {
//           toast.error(error.message);
//         }
//       }
//     };

//     const interval = setInterval(checkMetrics, 5000);
//     return () => clearInterval(interval);
//   }, [token]);

//   return (
//     <Router>
//       <div className="App">
//         <header className="App-header">
//           <h1>Welcome {username} !!!</h1>
//           {token && <button onClick={handleLogout}>Logout</button>}
//         </header>
//         <main>
//           <Routes>
//             <Route path="/" element={token ? <Navigate to="/options" /> : <Login onLogin={handleLogin} />} />
//             <Route path="/options" element={token ? <Options username={username} /> : <Navigate to="/" />} />
//             <Route path="/api-usage" element={token ? <ApiUsageDashboard /> : <Navigate to="/" />} />
//             <Route path="/chat" element={token ? <Chat token={token} /> : <Navigate to="/" />} />
//             <Route path="/crud" element={token ? <CRUDOperations /> : <Navigate to="/" />} /> {/* New route for CRUD operations */}
//           </Routes>
//         </main>
//         <ToastContainer />
//       </div>
//     </Router>
//   );
// };

// const Options = ({ username }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="options-container">
//       <h2>Hello, {username}! Please select an option:</h2>
//       <div className="options">
//         <button onClick={() => navigate('/api-usage')}>API Usage Dashboard</button>
//         <button onClick={() => navigate('/chat')}>Chat Application</button>
//         <button onClick={() => navigate('/crud')}>Manage Data</button> {/* New button for CRUD operations */}
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiUsageDashboard from './components/ApiUsageDashboard';
import Login from './components/Login';
import Chat from './components/Chat';
import CRUDOperations from './components/CRUDOperations'; // Import the new CRUD component
import axios from 'axios';
import './App.css';

const App = () => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');
  const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
  const [metrics, setMetrics] = useState({ cpuUsage: 0, memoryUsage: 0, diskUsage: 0, networkUsage: { rx: 0, tx: 0 } });

  // Ref to track last alert time
  const lastAlertTime = useRef({
    cpu: 0,
    memory: 0,
    disk: 0,
    networkRx: 0,
    networkTx: 0
  });

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

  const fetchSystemMetrics = async () => {
    try {
      const response = await axios.get('http://localhost:3000/monitoring'); // Update URL if necessary
      return response.data;
    } catch (error) {
      if (error.response) {
        // Handle HTTP errors
        const status = error.response.status;
        const message = error.response.data.error || error.response.data.message || `Status code: ${status}`;
        switch (status) {
          case 404:
            toast.error('Monitoring endpoint not found.', { className: 'custom-toast-error' });
            break;
          case 500:
            toast.error('Server error. Please try again later.', { className: 'custom-toast-error' });
            break;
          default:
            toast.error(message, { className: 'custom-toast-error' });
        }
      } else if (error.request) {
        toast.error('No response received from the server.', { className: 'custom-toast-error' });
      } else {
        toast.error(`Error: ${error.message}`, { className: 'custom-toast-error' });
      }
      throw error; // Re-throw to ensure error handling in useEffect
    }
  };

  useEffect(() => {
    const checkMetrics = async () => {
      try {
        const data = await fetchSystemMetrics();
        setMetrics(data);

        // Set threshold values
        const cpuThreshold = 80;
        const memoryThreshold = 500; // Example threshold
        const diskThreshold = 10240; // Example threshold
        const networkThreshold = { rx: 10240, tx: 10240 }; // Example threshold

        const now = Date.now();
        const alertInterval = 30000; // 30 seconds

        // Throttle alerting
        if (data.cpuUsage > cpuThreshold && (now - lastAlertTime.current.cpu > alertInterval)) {
          toast.error(`High CPU Usage: ${data.cpuUsage}%`, { className: 'custom-toast-error' });
          lastAlertTime.current.cpu = now;
        }
        if (data.memoryUsage > memoryThreshold && (now - lastAlertTime.current.memory > alertInterval)) {
          toast.error(`High Memory Usage: ${data.memoryUsage} MB`, { className: 'custom-toast-error' });
          lastAlertTime.current.memory = now;
        }
        if (data.diskUsage > diskThreshold && (now - lastAlertTime.current.disk > alertInterval)) {
          toast.error(`High Disk Usage: ${data.diskUsage} MB`, { className: 'custom-toast-error' });
          lastAlertTime.current.disk = now;
        }
        if (data.networkUsage.rx > networkThreshold.rx && (now - lastAlertTime.current.networkRx > alertInterval)) {
          toast.error(`High Network Rx Usage: ${data.networkUsage.rx} MB`, { className: 'custom-toast-error' });
          lastAlertTime.current.networkRx = now;
        }
        if (data.networkUsage.tx > networkThreshold.tx && (now - lastAlertTime.current.networkTx > alertInterval)) {
          toast.error(`High Network Tx Usage: ${data.networkUsage.tx} MB`, { className: 'custom-toast-error' });
          lastAlertTime.current.networkTx = now;
        }
      } catch (error) {
        console.error('Error checking metrics:', error);
      }
    };

    // Check metrics every 5 seconds
    const interval = setInterval(checkMetrics, 5000);
    return () => clearInterval(interval);
  }, []); // Only run once on mount

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome {username} !!!</h1>
          {token && <button onClick={handleLogout}>Logout</button>}
        </header>
        <main>
          <Routes>
            <Route path="/" element={token ? <Navigate to="/options" /> : <Login onLogin={handleLogin} />} />
            <Route path="/options" element={token ? <Options username={username} /> : <Navigate to="/" />} />
            <Route path="/api-usage" element={token ? <ApiUsageDashboard /> : <Navigate to="/" />} />
            <Route path="/chat" element={token ? <Chat token={token} /> : <Navigate to="/" />} />
            <Route path="/crud" element={token ? <CRUDOperations /> : <Navigate to="/" />} /> {/* New route for CRUD operations */}
          </Routes>
        </main>
        <ToastContainer hideProgressBar />
      </div>
    </Router>
  );
};

const Options = ({ username }) => {
  const navigate = useNavigate();

  return (
    <div className="options-container">
      <h2>Hello, {username}! Please select an option:</h2>
      <div className="options">
        <button onClick={() => navigate('/api-usage')}>API Usage Dashboard</button>
        <button onClick={() => navigate('/chat')}>Chat Application</button>
        <button onClick={() => navigate('/crud')}>Manage Data</button> {/* New button for CRUD operations */}
      </div>
    </div>
  );
};

export default App;

