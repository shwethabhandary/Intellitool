import React, { useState, useEffect } from 'react';
import { getSession } from '.././../pages/session';
import { bgLinearGradientClassName } from '@/styles/styles';
import { textLinearGradientClassName } from "@/styles/styles";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // Sample data for demonstration
  const [users, setUsers] = useState([
    { id: 1, username: 'user1', role: 'student' },
    { id: 2, username: 'user2', role: 'professor' },
    // Add more sample data as needed
  ]);

  const { isLoggedIn, username, role } = getSession();
  const { Professor, TotalCourses, TodoList, Summeries } = { Professor: 3, TotalCourses: 4, TodoList: 5,  Summeries: 10 };

  useEffect(() => {
    // Fetch data or perform any initialization
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className={`${textLinearGradientClassName} font-bold text-3xl mb-2`}> Student Dashboard </h2>
      </div>
      <div className="dashboard-cards">
        <div className="dashboard-card dc0 ">
          <h3> Professors</h3>
          <h2 className={`${textLinearGradientClassName} font-bold text-6xl mb-2`}> {Professor}</h2>
        </div>
        <div className="dashboard-card dc1 ">
          <h3> Enrolled Courses</h3>
          <h2 className={`${textLinearGradientClassName} font-bold text-6xl mb-2`}> {TotalCourses}</h2>
        </div>
        <div className="dashboard-card dc2">
          <h3>To-do List</h3>
          <h2 className={`${textLinearGradientClassName} font-bold text-6xl mb-2`}> {TodoList}</h2>
        </div>
        <div className="dashboard-card dc3">
          <h3>Total Summeries</h3>
          <h2 className={`${textLinearGradientClassName} font-bold text-6xl mb-2`}> {Summeries}</h2>
        </div>
      </div>
      <div className="dashboard-cards" style={{ display: 'flex', gap: '20px', paddingTop: '20px' }}>
        {/* Left card (wider) */}
        <div className="dashboard-card dc4" style={{ flex: '2' }}>
          <div className="tab">
            <button className={`tablinks ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)} id="One">Professors</button>
            <button className={`tablinks ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)} id="Two">Enrolled Courses</button>
            <button className={`tablinks ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)} id="Three">Todo List</button>
            <button className={`tablinks ${activeTab === 4 ? 'active' : ''}`} onClick={() => handleTabClick(4)} id="Four">Summeries</button>

            <div id="One" className={`tabcontent ${activeTab === 1 ? 'active' : ''}`}>
              <h3>Professors</h3>
              <p>Tab number one.</p>
            </div>

            <div id="Two" className={`tabcontent ${activeTab === 2 ? 'active' : ''}`}>
              <h3>Enrolled Courses</h3>
              <p>Tab number two.</p> 
            </div>

            <div id="Three" className={`tabcontent ${activeTab === 3 ? 'active' : ''}`}>
              <h3>Todo List</h3>
              <p>Tab number three.</p> 
            </div>

            <div id="Four" className={`tabcontent ${activeTab === 4 ? 'active' : ''}`}>
              <h3>Summeries</h3>
              <p>Tab number four.</p> 
            </div>
          </div>
        </div>
        {/* Right card */}
        <div className="dashboard-card dc5" style={{ flex: '1' }}>
          <h3>Tabs</h3>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
