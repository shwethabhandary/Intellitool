import React, { useState, useEffect } from 'react';
import { getSession } from '.././../pages/session';
import { bgLinearGradientClassName } from '@/styles/styles';
import { textLinearGradientClassName } from "@/styles/styles";
import { Loader, PageHeader } from '@/components';
import { toast } from 'react-hot-toast';

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
  const [professors, setProfessors] = useState([]);
  const [fieldType, setFieldType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dummyProfessors = [
    { id: 1, name: "Dr. Alice Johnson", field: "Computer Science", courses: ["Data Structures", "Algorithms"], avatar: "/previews/avatar1.png" },
    { id: 2, name: "Dr. Bob Smith", field: "Mathematics", courses: ["Calculus", "Linear Algebra"], avatar: "/previews/avatar2.png" }
  ];

  const subjects = [
    { name: 'Mathematics', code: 'MAT101' },
    { name: 'Physics', code: 'PHY201' },
    { name: 'Biology', code: 'BIO301' },
    { name: 'Chemistry', code: 'CHE401' },
    { name: 'Computer Science', code: 'CSE501' }
  ];

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        ...(fieldType && { field_type: fieldType }),
      }).toString();

      const response = await fetch(`/api/professors?${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch professors');
      }
      const data = await response.json();
      setProfessors(data);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to load data: ' + error.message);
      setProfessors(dummyProfessors); // Fallback to dummy data
      setIsLoading(false);
    }
  };
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
      <div className="dashboard-cards" style={{ display: 'flex', gap: '50px', paddingTop: '20px' }}>
        {/* Left card (wider) */}
        <div className="dashboard-card dc4" style={{ flex: '2' }}>
          <div className="tab">
            <button className={`tablinks ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)} id="One">Professors</button>
            <button className={`tablinks ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)} id="Two">Enrolled Courses</button>
            <button className={`tablinks ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)} id="Three">Summeries</button>

            <div id="One" className={`tabcontent ${activeTab === 1 ? 'active' : ''}`}>
      {isLoading ? (
        <Loader text="Loading professors..." />
      ) : (
        <div className="mt-4">
          {professors.length > 0 ? (
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Avatar
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Courses
                  </th>
                </tr>
              </thead>
              <tbody>
                {professors.map((professor, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <img src={professor.avatar || "/default-avatar.png"} alt="Avatar" className="h-10 w-10 rounded-full" />
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {professor.name}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {professor.courses.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No professors found</p>
          )}
        </div>
      )}
  
              
            </div>

            <div id="Two" className={`tabcontent ${activeTab === 2 ? 'active' : ''}`}>
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Subject Code
                  </th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={index} className="border-b border-gray-200 bg-white">
                    <td className="px-5 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                      {subject.name}
                    </td>
                    <td className="px-5 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                      {subject.code}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            </div>

            <div id="Three" className={`tabcontent ${activeTab === 3 ? 'active' : ''}`}>
              <h3>Summeries</h3>
              <p>Tab number three.</p> 
            </div>
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
                <img src="https://cdn-icons-png.freepik.com/256/5344/5344695.png?semt=ais_hybrid" alt="Photo"/>
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

export default StudentDashboard;
