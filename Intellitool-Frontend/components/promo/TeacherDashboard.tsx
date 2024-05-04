import React, { useState, useEffect } from 'react';
import { FaCheck, FaTrash, FaEye } from 'react-icons/fa'; // Import icons
import { getSession } from '.././../pages/session';
import { bgLinearGradientClassName } from '@/styles/styles';
import { textLinearGradientClassName } from "@/styles/styles";

const TeacherDashboard = () => {
  // Sample data for demonstrationimport { getSession } from './session';import { getSession } from './session';
  const [users, setUsers] = useState([
    { id: 1, username: 'user1', topic: 'cloud computing', viewed: false },
    { id: 2, username: 'user2', topic: 'data mining', viewed: false },
    { id: 3, username: 'user1', topic: 'cloud computing', viewed: false },
    { id: 4, username: 'user2', topic: 'data mining', viewed: false },
    { id: 5, username: 'user1', topic: 'cloud computing', viewed: false },
    { id: 6, username: 'user2', topic: 'data mining', viewed: false },
    { id: 7, username: 'user1', topic: 'cloud computing', viewed: false },
    // Add more sample data as needed
  ]);

  
  const { isLoggedIn, username, role } = getSession()
  const { TotalStudent, TotalCourses, Aprooved, ToReview } = { TotalStudent: 3, Aprooved: 4, TotalCourses: 5, ToReview:4 };

  useEffect(() => {
    // Fetch data or perform any initialization
  }, []);

  const handleView = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, viewed: true };
      }
      return user;
    }));
    // Display popup with text
    alert("Viewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...iewing user details...");
  };
  
  const handleReject = (userId) => {
    if (window.confirm('Are you sure you want to reject?')) {
      // Logic to reject user
      console.log('User rejected:', userId);
    }
  };

  const handleApprove = (userId) => {
    // Logic to approve user
    console.log('User approved:', userId);
    alert('User approved!');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
          <h2 className={`${textLinearGradientClassName} font-bold text-3xl mb-2`}> Professor dashboard</h2>
      </div>
      <div className="dashboard-cards">
        <div className="dashboard-card dc0 ">
          <h3> Total Students</h3>
          <h2 className={`${textLinearGradientClassName} font-bold text-6xl mb-2`}> {TotalStudent}</h2>
        </div>
        <div className="dashboard-card dc1">
          <h3>Total Courses</h3>
          <h2 className={`${textLinearGradientClassName} font-bold text-6xl mb-2`}> {TotalCourses}</h2>
        </div>
        <div className="dashboard-card dc2">
          <h3>Aprooved Summeries</h3>
          <h2 className={`${textLinearGradientClassName} font-bold text-6xl mb-2`}> {Aprooved}</h2>
        </div>
        <div className="dashboard-card dc3">
          <h3>Summeries To be Reviwed</h3>
          <h2 className={`${textLinearGradientClassName} font-bold text-6xl mb-2`}> {ToReview}</h2>
        </div>
      </div>
      <div className="dashboard-cards" style={{ display: 'flex', gap: '20px', paddingTop: '20px' }}>
        {/* Left card (wider) */}
        <div className="dashboard-card dc4" style={{ flex: '3' }}>
          <div className="table-container">
            <h2 className={`${textLinearGradientClassName} font-bold text-lg mb-2`}> Review and approve the summeries sent by students</h2>
            <table className="user-table">
              <thead>
                <tr className='user-tr-center'>
                  <th>Sl. No.</th>
                  <th>Username</th>
                  <th>Topic</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.topic}</td>
                    <td>
                      {user.viewed ? (
                        <>
                          <button className="approve-button" onClick={() => handleApprove(user.id)}>
                            <FaCheck color="green" size={20} />
                          </button>
                          <button className="reject-button" onClick={() => handleReject(user.id)}>
                            <FaTrash color="red" size={20} />
                          </button>
                        </>
                      ) : (
                        <button className="view-button" onClick={() => handleView(user.id)}>
                          <FaEye color="blue" size={20} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Right card */}
        <div className="dashboard-card dc5" style={{ flex: '1' }}>

        <div className="id-card-tag"></div>
          <div className="id-card-tag-strip"></div>
          <div className="id-card-hook"></div>
          <div className="id-card-holder">
            <div className="id-card">
              <div className="header">
                <img src="https://www.sjsu.edu/communications/pics/SJSU%20_%20Online%20Stacked-01.png" alt="Header"/>
              </div>
              <div className="photo">
                <img src="https://static.thenounproject.com/png/2909357-200.png" alt="Photo"/>
              </div>
              <h2>Email: {username}</h2>
              <h2>Designation: {role}</h2>
              <h3>www.sjsu.edu</h3>
              <hr />
              <p>One Washington Square</p>
              <p>San Jose, California, USA <strong>95192</strong></p>
              <p>Ph: +14089241601 | sjsu.edu/bursar</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
