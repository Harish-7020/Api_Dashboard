// import React from 'react';
// import ApiUsageDashboard from './ApiUsageDashboard';

// function App() {
//   return (
//     <div className="App">
//       <ApiUsageDashboard />
//     </div>
//   );
// }

// export default App;

// src/App.js
// src/App.js
import React from 'react';
import ApiUsageList from './components/ApiUsageList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 className="App-title">API Usage Dashboard</h1>
      </header>
      <ApiUsageList />
    </div>
  );
}

export default App;

