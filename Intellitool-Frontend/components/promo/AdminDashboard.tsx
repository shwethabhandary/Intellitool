import React, { useState, useEffect } from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { getSession } from '.././../pages/session';
import { textLinearGradientClassName } from "@/styles/styles";
import axios from 'axios'; // Import Axios

const AdminDashboard = () => {
  const [fusers, setFilteredUsers] = useState([]);
  const { isLoggedIn, username, role } = getSession();
  const { TotalStudent, TotalProfessor, TotalCourses } = { TotalStudent: 3, TotalProfessor: 4, TotalCourses: 5 };

  useEffect(() => {
    fetchUsers(); // Fetch users when component mounts
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch users data
      const usersResponse = await axios.get('http://localhost:8000/intellitool/users');
      const allUsers = usersResponse.data;
      const adminUsers = usersResponse.data.filter(user => user.role === 'admin').map(user => user.username);
      console.log(adminUsers);
  
      // Fetch students data
    const studentsResponse = await axios.get('http://localhost:8000/intellitool/students');
    const students = studentsResponse.data.map(student => student.name);

    // Fetch professors data
    const professorsResponse = await axios.get('http://localhost:8000/intellitool/professors');
    const professors = professorsResponse.data.map(professor => professor.name);

    // Combine students and professors into a single list
    const excludedUsers = [...students, ...professors, ...adminUsers,];
      console.log(excludedUsers)
  
      // Initialize filteredUsers list
      let filteredUsers = [];
  
      // Iterate over all users
      for (const user of allUsers) {
        // Extract the username from the user object
        const username = user.username;
        // Check if the username is not in excludedUsers
        if (!excludedUsers.includes(username)) {
          // If not present, add the user to filteredUsers
          filteredUsers.push(user);
        }
      }
  
      // Update users state with filtered users
      console.log(filteredUsers)
      setFilteredUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  

  const handleApprove = async (user) => {
    try {
      const { username, id, role } = user;
      console.log(username);
      console.log(id);
      console.log(role);
      const url = `http://localhost:8000/intellitool/admin/approveUser?role=${role}`;
      let postData = {};
  
      if (role === 'student') {
        postData = {
          username,
          id
        };
      } else if (role === 'teacher') {
        postData = {
          username,
          id,
          field: 'ENG', // You can customize this according to your requirements
          description: 'Teaches for Eng department' // You can customize this according to your requirements
        };
      }
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([postData]) // Wrap postData in an array
      });
  
      if (response.ok) {
        console.log('User approved:', await response.json());
        alert('User approved!');
        // Optionally, you can refetch the users after approval
        fetchUsers();
      } else {
        console.error('Failed to approve user:', response.status);
      }
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };
  
  

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className={`${textLinearGradientClassName} font-bold text-3xl mb-2`}> Admin dashboard</h2>
      </div>
      <div className="dashboard-cards">
        <div className="dashboard-card dc1 ">
          <h3> Total Students</h3>
          <h2 className={`${textLinearGradientClassName} font-bold text-6xl mb-2`}> {TotalStudent}</h2>
        </div>
        <div className="dashboard-card dc2">
          <h3>Total Professors</h3>
          <h2 className={`${textLinearGradientClassName} font-bold text-6xl mb-2`}> {TotalProfessor}</h2>
        </div>
        <div className="dashboard-card dc3">
          <h3>Total Courses</h3>
          <h2 className={`${textLinearGradientClassName} font-bold text-6xl mb-2`}> {TotalCourses}</h2>
        </div>
      </div>
      <h2 className={`${textLinearGradientClassName} font-bold text-lg mb-2`}> Grant / Deny Access to the Portal</h2>
      <table className="user-table">
        <thead>
          <tr className='user-tr-center'>
            <th>Sl. No.</th>
            <th>Username</th>
            <th>Role</th>
            <th>Approval request</th>
          </tr>
        </thead>
        <tbody>
          {fusers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button className="approve-button" onClick={() => handleApprove(user)}>
                  <FaCheck color="green" size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
