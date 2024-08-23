// import React, { useState } from 'react';
// import axios from 'axios';
// import './Login.css';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3000/auth/login', {
//         username,
//         password,
//       });
//       console.log('API response:', response.data);
//       const { access_token, userId } = response.data; 
//       localStorage.setItem('token', access_token);
//       localStorage.setItem('username', username);
//       localStorage.setItem('userId', userId); 
//       onLogin(access_token, username);  
//     } catch (error) {
//       console.error('Login failed:', error);
//       alert('Invalid credentials');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2 className="login-title">Welcome Back</h2>
//       <form onSubmit={handleSubmit} className="login-form">
//         <div className="input-group">
//           <label>Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="login-input"
//             required
//           />
//         </div>
//         <div className="input-group">
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="login-input"
//             required
//           />
//         </div>
//         <button type="submit" className="login-button" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });
      const { access_token, userId } = response.data; 
      
      // Store token and username in sessionStorage instead of localStorage
      sessionStorage.setItem('token', access_token);
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('userId', userId); 
      
      onLogin(access_token, username);  
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
