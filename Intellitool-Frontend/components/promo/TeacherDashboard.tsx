import React, { useState, useEffect } from 'react';
import { FaCheck, FaTrash, FaEye } from 'react-icons/fa';
import { getSession } from '.././../pages/session';
import { textLinearGradientClassName } from "@/styles/styles";
import axios from 'axios'; // Import Axios
import { Loader } from '@/components';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [coursesTaught, setCoursesTaught] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [classSchedules, setClassSchedules] = useState([]);
  const { isLoggedIn, username, role, uid } = getSession();
  const userid = parseInt(uid, 10); // Convert string to integer
  const { TotalStudent, TotalCourses, Aprooved, ToReview } = { TotalStudent: 3, Aprooved: 4, TotalCourses: 5, ToReview:4 };
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (activeTab === 1) {
      fetchEnrolledStudents();
    }
    else if (activeTab === 2) {fetchCoursesTaught(userid);}
    else if (activeTab === 3) {
      generateClassSchedules();
    }
  }, [activeTab]);

  const fetchCoursesTaught = async (userid) => {
    try {
      setIsLoading(true);
      // Fetch courses taught by the professor (based on UID)
      const response = await axios.get(`http://localhost:8000/intellitool/courses`);
      console.log('uid', userid)
      console.log('Response data:', response.data);
      const courses = response.data.filter(course => course.professor_id === userid);
      console.log('Filtered courses:', courses);
      setCoursesTaught(courses);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching courses taught:', error);
      setIsLoading(false);
    }
  };
  
  
  

  const fetchEnrolledStudents = async () => {
    setIsLoading(true);
    try {
      const coursesResponse = await axios.get(`http://localhost:8000/intellitool/courses`);
      const courses = coursesResponse.data.filter(course => course.professor_id === userid);
      const enrolledStudents = courses.flatMap(course => {
        if (course.students && course.students.length > 0) {
          return course.students.map(student => ({ student, course: course.name }));
        }
        return [];
      });
      setEnrolledStudents(enrolledStudents);
    } catch (error) {
      console.error('Error fetching enrolled students:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateClassSchedules = () => {
    const uniqueSubjects = Array.from(new Set(enrolledStudents.map(student => student.course)));
    const schedules = uniqueSubjects.map(subject => ({
      subject,
      classDay: generateClassDay(),
      classTime: generateClassTime()
    }));
    setClassSchedules(schedules);
  };

  const generateClassDay = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    return days[Math.floor(Math.random() * days.length)];
  };

  const generateClassTime = () => {
    const times = ['9:00 am - 11:00 am', '11:00 am - 1:00 pm', '1:00 pm - 3:00 pm', '3:00 pm - 5:00 pm', '5:00 pm - 7:00 pm'];
    return times[Math.floor(Math.random() * times.length)];
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className={`${textLinearGradientClassName} font-bold text-3xl mb-2`}> Professor dashboard</h2>
      </div>
      <div className="dashboard-cards">
        {/* Cards */}
        <div className="dashboard-card dc0 ">
          <h3> Total Students</h3>
          <h2 className={`${textLinearGradientClassName} font-bold text-6xl mb-6`}> {TotalStudent}</h2>
        </div>
        <div className="dashboard-card dc1">
          <h3>Total Courses</h3>
          <h2 className={`${textLinearGradientClassName} font-bold text-6xl mb-6`}> {TotalCourses}</h2>
        </div>
      </div>
      <div className="dashboard-cards" style={{ display: 'flex', gap: '20px', paddingTop: '20px' }}>
        {/* Left card (wider) */}
        <div className="dashboard-card dc4" style={{ flex: '2' }}>
          <div className="tab">
            <button className={`tablinks ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)} id="One">Students enrolled under me</button>
            <button className={`tablinks ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)} id="Two">Courses Taught</button>
            <button className={`tablinks ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)} id="Three">Class Schedules</button>

            <div id="One" className={`tabcontent ${activeTab === 1 ? 'active' : ''}`}>
  {isLoading ? (
    <Loader text="Loading students..." />
  ) : (
    <div className="mt-4">
      {enrolledStudents.length > 0 ? (
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Subjects
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from(new Set(enrolledStudents.map(student => student.student))).map((studentEmail, index) => {
              const studentCourses = enrolledStudents
                .filter(student => student.student === studentEmail)
                .map(student => student.course)
                .join(", ");
              return (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {studentEmail}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {studentCourses}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No students found</p>
      )}
    </div>
  )}
</div>


            <div id="Two" className={`tabcontent ${activeTab === 2 ? 'active' : ''}`}>
              {isLoading ? (
                <Loader text="Loading courses taught..." />
              ) : (
                <div className="mt-4">
                  {coursesTaught.length > 0 ? (
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Subject Id
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Subject Name
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Subject Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {coursesTaught.map((course, index) => (
                          <tr key={index} className="border-b border-gray-200 bg-white">
                            <td className="px-5 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                              {course.id}
                            </td>
                            <td className="px-5 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                              {course.name}
                            </td>
                            <td className="px-5 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                              {course.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No courses taught found</p>
                  )}
                </div>
              )}
            </div>

            <div id="Three" className={`tabcontent ${activeTab === 3 ? 'active' : ''}`}>
              {isLoading ? (
                <Loader text="Generating class schedules..." />
              ) : (
                <div className="mt-4">
                  {classSchedules.length > 0 ? (
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Subject Nane
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Class day
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Class time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {classSchedules.map((schedule, index) => (
                          <tr key={index}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              {schedule.subject}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              {schedule.classDay}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              {schedule.classTime}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No class schedules generated</p>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right card */}
        <div className="dashboard-card dc5" style={{ flex: '1' }}>
          {/* Display professor's information */}
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
              <p className='l'>One Washington Square</p>
              <p className='l' >San Jose, California, USA <strong>95192</strong></p>
              <p className='l'>Ph: +14089241601 | sjsu.edu/bursar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard
