// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Table } from 'react-bootstrap';

// const ApiUsageDashboard = () => {
//   const [apiUsage, setApiUsage] = useState([]);

//   useEffect(() => {
//     const fetchApiUsage = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/apiusage');
//         setApiUsage(response.data);
//       } catch (error) {
//         console.error('Error fetching API usage:', error);
//       }
//     };

//     fetchApiUsage();
//   }, []);

//   return (
//     <Container>
//       <h1>API Usage Dashboard</h1>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>User ID</th>
//             <th>Request Method</th>
//             <th>Endpoint</th>
//             <th>Timestamp</th>
//             <th>Status</th>
//             <th>Error Details</th>
//           </tr>
//         </thead>
//         <tbody>
//           {apiUsage.map((usage) => (
//             <tr key={usage.id}>
//               <td>{usage.userId}</td>
//               <td>{usage.requestMethod}</td>
//               <td>{usage.endpoint}</td>
//               <td>{new Date(usage.timestamp).toLocaleString()}</td>
//               <td>{usage.status}</td>
//               <td>{usage.errorDetails}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default ApiUsageDashboard;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

const ApiUsageDashboard = () => {
  const [apiUsage, setApiUsage] = useState([]);

  useEffect(() => {
    const fetchApiUsage = async () => {
      try {
        const response = await axios.get('http://localhost:3000/apiusage');
        console.log('API response:', response.data); // Debugging log
        setApiUsage(response.data);
      } catch (error) {
        console.error('Error fetching API usage:', error);
      }
    };

    fetchApiUsage();
  }, []);

  return (
    <Container>
      <h1>API Usage Dashboard</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Request Method</th>
            <th>Endpoint</th>
            <th>Timestamp</th>
            <th>Status</th>
            <th>Error Details</th>
          </tr>
        </thead>
        <tbody>
          {apiUsage.map((usage) => (
            <tr key={usage.id}>
              <td>{usage.userId}</td>
              <td>{usage.requestMethod}</td>
              <td>{usage.endpoint}</td>
              <td>{new Date(usage.timestamp).toLocaleString()}</td>
              <td>{usage.status}</td>
              <td>{usage.errorDetails || 'No Error'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ApiUsageDashboard;

