// src/services/ApiService.js
const ApiService = {
    async fetchApiUsageLogs() {
      const response = await fetch('http://localhost:3000/apiusage');
      if (!response.ok) {
        throw new Error('Failed to fetch API usage logs');
      }
      return response.json();
    },
  };
  
  export default ApiService;
  