import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CRUDOperations.css';

const API_BASE_URL = 'http://localhost:3000';

const CRUDOperations = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || '');

  useEffect(() => {
    fetchStudents();
  }, [token]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchStudentDetails = async () => {
    if (!selectedStudentId) {
      alert('Please select a student ID.');
      return;
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/students/${selectedStudentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudentDetails(response.data);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  };

  const createStudent = async (student) => {
    try {
      await axios.post(`${API_BASE_URL}/v1/students`, student, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStudents();
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const updateStudent = async (student) => {
    if (!selectedStudentId) {
      alert('Please select a student ID to update.');
      return;
    }
    try {
      await axios.put(`${API_BASE_URL}/v1/students/${selectedStudentId}`, student, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async () => {
    if (!selectedStudentId) {
      alert('Please select a student ID to delete.');
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/v1/students/${selectedStudentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleCreateStudent = (event) => {
    event.preventDefault();
    const student = {
      FirstName: event.target.firstName.value,
      LastName: event.target.lastName.value,
      Class: event.target.class.value,
      City: event.target.city.value,
      DOB: event.target.dob.value,
      Grade: event.target.grade.value,
    };
    createStudent(student);
    event.target.reset();
  };

  const handleUpdateStudent = (event) => {
    event.preventDefault();
    const student = {
      FirstName: event.target.firstName.value,
      LastName: event.target.lastName.value,
      Class: event.target.class.value,
      City: event.target.city.value,
      DOB: event.target.dob.value,
      Grade: event.target.grade.value,
    };
    updateStudent(student);
    event.target.reset();
  };

  return (
    <div className="crud-operations">
      <h2>Student Management</h2>

      {/* Get Student Details */}
      <div className="operation-section">
        <h3>Get Student Details</h3>
        <select onChange={(e) => setSelectedStudentId(e.target.value)} value={selectedStudentId}>
          <option value="">Select Student ID</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.id}
            </option>
          ))}
        </select>
        <button onClick={fetchStudentDetails}>Get Details</button>
        {studentDetails && (
          <div className="student-details">
            <p>First Name: {studentDetails.FirstName}</p>
            <p>Last Name: {studentDetails.LastName}</p>
            <p>Class: {studentDetails.Class}</p>
            <p>City: {studentDetails.City}</p>
            <p>DOB: {studentDetails.DOB}</p>
            <p>Grade: {studentDetails.Grade}</p>
          </div>
        )}
      </div>

      {/* Create Student */}
      <div className="operation-section">
        <h3>Create Student</h3>
        <form onSubmit={handleCreateStudent}>
          <input type="text" name="firstName" placeholder="First Name" required />
          <input type="text" name="lastName" placeholder="Last Name" required />
          <input type="text" name="class" placeholder="Class" required />
          <input type="text" name="city" placeholder="City" required />
          <input type="date" name="dob" placeholder="Date of Birth" required />
          <input type="text" name="grade" placeholder="Grade" required />
          <button type="submit">Create</button>
        </form>
      </div>

      {/* Update Student */}
      <div className="operation-section">
        <h3>Update Student</h3>
        <select onChange={(e) => setSelectedStudentId(e.target.value)} value={selectedStudentId}>
          <option value="">Select Student ID</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.id}
            </option>
          ))}
        </select>
        <form onSubmit={handleUpdateStudent}>
          <input type="text" name="firstName" placeholder="First Name" required />
          <input type="text" name="lastName" placeholder="Last Name" required />
          <input type="text" name="class" placeholder="Class" required />
          <input type="text" name="city" placeholder="City" required />
          <input type="date" name="dob" placeholder="Date of Birth" required />
          <input type="text" name="grade" placeholder="Grade" required />
          <button type="submit">Update</button>
        </form>
      </div>

      {/* Delete Student */}
      <div className="operation-section">
        <h3>Delete Student</h3>
        <select onChange={(e) => setSelectedStudentId(e.target.value)} value={selectedStudentId}>
          <option value="">Select Student ID</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.id}
            </option>
          ))}
        </select>
        <button onClick={deleteStudent}>Delete</button>
      </div>
    </div>
  );
};

export default CRUDOperations;
