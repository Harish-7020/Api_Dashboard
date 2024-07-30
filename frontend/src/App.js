// import React from 'react';
// import ApiUsageDashboard from './components/ApiUsageDashboard';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>API Usage Dashboard</h1>
//       </header>
//       <main>
//         <ApiUsageDashboard />
//       </main>
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import ApiUsageDashboard from './components/ApiUsageDashboard';
import './App.css';

const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');

  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        <h1>API Usage Dashboard</h1>
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
        </button>
      </header>
      <main>
        <ApiUsageDashboard theme={theme} />
      </main>
    </div>
  );
};

export default App;
