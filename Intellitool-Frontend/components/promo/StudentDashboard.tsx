import React, { useState, useEffect } from 'react';
import { getSession } from '.././../pages/session';
import { bgLinearGradientClassName } from '@/styles/styles';
import { textLinearGradientClassName } from "@/styles/styles";
import { Loader, PageHeader } from '@/components';
import { toast } from 'react-hot-toast';
import axios from 'axios'; // Import Axios

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  

  const [fieldType, setFieldType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, username, role } = getSession();
  const [professorsWithStudents, setProfessorsWithStudents] = useState([]);
  const [coursesEnrolled, setStudentCoursesTaken] = useState([]);
  const [classSchedules, setClassSchedules] = useState([]);
  const [totalProfessor, setTotalProfessor] = useState([]);
  const [totalCourses, setTotalCourses] = useState([]);
  

  useEffect(() => {
      fetchProfessorsWithStudents();
      fetchStudentCourses();
      fetchStudentCourses();
      generateClassSchedules();
  }, [activeTab]);

  const fetchProfessorsWithStudents = async () => {
    try {
      // Fetch all courses
      const coursesResponse = await axios.get('http://localhost:8000/intellitool/courses');
      const courses = coursesResponse.data;
      
      // Extract unique professor IDs from courses
      const professorIds = [...new Set(courses.map(course => course.professor_id))];
      
      // Fetch all professors
      const professorsResponse = await axios.get('http://localhost:8000/intellitool/professors');
      const professors = professorsResponse.data;
  
      // Filter professors who have courses taught by them in which the username is enrolled
      const professorsWithStudents = professors.filter(professor =>
        professor.courses.some(courseId =>
          courses.some(course => course.professor_id === professor.id && course.students.includes(username))
        )
      );
      setTotalProfessor(professorsWithStudents.length);
      setProfessorsWithStudents(professorsWithStudents);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const fetchStudentCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/intellitool/courses');
      const courses = response.data;
  
      // Filter courses where the student is enrolled
      const studentCourses = courses.filter(course => course.students.includes(username));
  
      // Now you have the list of courses where the student is enrolled
      console.log('Student courses:', studentCourses);
      setTotalCourses(studentCourses.length);
      setStudentCoursesTaken(studentCourses);
    } catch (error) {
      console.error('Error fetching student courses:', error);
    }
  };

  const generateClassSchedules = () => {
    const uniqueSubjects = Array.from(new Set(coursesEnrolled.map(course => course.name))); // Change student to course and course.name
    const schedules = uniqueSubjects.map(subject => ({
      subject: subject, // Use subject here
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



  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className={`${textLinearGradientClassName} font-bold text-3xl mb-2`}> Student Dashboard </h2>
      </div>
      <div className="dashboard-cards">
        <div className="dashboard-card dc0 ">
          <h3> Professors</h3>
          <h2 className={`${textLinearGradientClassName} font-bold text-6xl mb-2`}> {totalProfessor}</h2>
        </div>
        <div className="dashboard-card dc1 ">
          <h3> Enrolled Courses</h3>
          <h2 className={`${textLinearGradientClassName} font-bold text-6xl mb-2`}> {totalCourses}</h2>
        </div>
        <div className="dashboard-card dc2">
          <h3>Classes/ week</h3>
          <h2 className={`${textLinearGradientClassName} font-bold text-6xl mb-2`}> {totalCourses}</h2>
        </div>
        {/* <div className="dashboard-card dc3">
          <h3>Total Summaries</h3>
          <h2 className={`${textLinearGradientClassName} font-bold text-6xl mb-2`}> {Summeries}</h2>
        </div> */}
      </div>
      <div className="dashboard-cards" style={{ display: 'flex', gap: '50px', paddingTop: '20px' }}>
        {/* Left card (wider) */}
        <div className="dashboard-card dc4" style={{ flex: '2' }}>
          <div className="tab">
            <button className={`tablinks ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)} id="One">Professors</button>
            <button className={`tablinks ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)} id="Two">Enrolled Courses</button>
            <button className={`tablinks ${activeTab === 3 ? 'active' : ''}`} onClick={() => handleTabClick(3)} id="Three">Class Schedule</button>

            <div id="One" className={`tabcontent ${activeTab === 1 ? 'active' : ''}`}>
  {isLoading ? (
    <Loader text="Loading professors..." />
  ) : (
    <div className="mt-4">
      {professorsWithStudents.length > 0 ? (
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Avatar
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Course ID
              </th>
            </tr>
          </thead>
          <tbody>
            {professorsWithStudents.map((professor, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <img src={"https://1000logos.net/wp-content/uploads/2021/07/San-Jose-State-Spartans-logo.png"} alt="Avatar" className="h-10 w-10 rounded-full" />
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {professor.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {professor.courses.map((course, index) => (
                    <div key={index}>{course}</div>
                  ))}
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
      {coursesEnrolled.map((course, index) => (
        <tr key={index} className="border-b border-gray-200 bg-white">
          <td className="px-5 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
            {course.name}
          </td>
          <td className="px-5 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
            {course.id}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
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
                            Subject Name
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
              <p className='l'>One Washington Square</p>
              <p className='l'>San Jose, California, USA <strong>95192</strong></p>
              <p className='l'>Ph: +14089241601 | sjsu.edu/bursar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;