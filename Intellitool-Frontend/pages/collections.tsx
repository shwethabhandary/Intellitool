import React, { useState, useEffect } from 'react';
import { Switch, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import NewCourseModal from './NewCourseModal'; // Correct import of your modal component

const Collections = () => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Only access localStorage after component mounts
  useEffect(() => {
    const getCoursesFromStorage = () => {
      const storedCourses = localStorage.getItem('courses');
      return storedCourses ? JSON.parse(storedCourses) : [];
    };

    setCourses(getCoursesFromStorage());
  }, []);

  const toggleActive = (courseId) => {
    const updatedCourses = courses.map(course =>
      course.id === courseId ? { ...course, isActive: !course.isActive } : course
    );
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  const addCourse = (course) => {
    const updatedCourses = [...courses, course];
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setIsModalOpen(false); // Close modal after adding
  };

  const deleteCourse = (courseId) => {
    const updatedCourses = courses.filter(course => course.id !== courseId);
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
  };

  const openEditModal = (course) => {
    setCurrentCourse(course);
    setIsModalOpen(true);
  };

  const updateCourse = (updatedCourse) => {
    const updatedCourses = courses.map(course =>
      course.id === updatedCourse.id ? updatedCourse : course
    );
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setIsModalOpen(false); // Close modal after updating
    setCurrentCourse(null); // Clear current course
  };

  const generateRandomDate = () => {
    const today = new Date();
    const day = today.getDay(); // Current day (0-6)
    const randomOffset = Math.floor(Math.random() * 7); // Random number between 0 and 6
    const targetDay = (day + randomOffset) % 7; // Ensure the day is within the week
    const targetDate = new Date(today.setDate(today.getDate() + targetDay));
    return targetDate.toLocaleDateString();
  };

  return (
    <div className="collections-container">
      <div className="top-bar">
        <button onClick={() => setIsModalOpen(true)}>+ New Collection</button>
        {/* Additional top-bar content here */}
      </div>

      <div className="courses-container">
        {courses.map((course) => (
          <div key={course.id} className="course-box">
            <div className="course-info">
              <h3>{course.code}</h3> {/* Course Name */}
              <h3>{course.name}</h3> {/* Course Name */}
              <p>Professor: {course.professor}</p> {/* Professor Name */}
              <p>Next class this week: {generateRandomDate()}</p> {/* Next class this week */}
            </div>
            <div className="course-actions">
              <Switch isChecked={course.isActive} onChange={() => toggleActive(course.id)} />
              <IconButton
                aria-label="Delete course"
                icon={<DeleteIcon />}
                onClick={() => deleteCourse(course.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <NewCourseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          addCourse={addCourse}
          currentCourse={currentCourse}
          setCurrentCourse={setCurrentCourse}
          updateCourse={updateCourse}
        />
      )}
    </div>
  );
};

export default Collections;
