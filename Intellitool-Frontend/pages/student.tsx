import React, { useState, useEffect } from 'react';
import { Loader, PageHeader } from '@/components';
import { toast } from 'react-hot-toast';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [term, setTerm] = useState('');
  const [enrolledCourse, setEnrolledCourse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dummyStudents = [
    { id: 1, name: "Jane Doe", term: "Fall 2023", enrolled_courses: ["CMPE 272", "CMPE 280"], avatar: "/previews/avatar1.png" },
    { id: 2, name: "John Smith", term: "Spring 2024", enrolled_courses: ["CMPE 273", "CMPE 272"], avatar: "/previews/avatar2.png" }
  ];

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        ...(term && { term }),
        ...(enrolledCourse && { enrolled_course: enrolledCourse }),
      }).toString();
      
      const response = await fetch(`/api/students?${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
      setStudents(data);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to load data: ' + error.message);
      setStudents(dummyStudents); // Fallback to dummy data
      setIsLoading(false);
    }
  };

  return (
    <div className="shadow-lg bg-white p-4 lg:p-10 mx-12 md:mx-24 lg:mx-48 my-12 rounded-lg text-lg">
      <PageHeader title="Student Management" subTitle="View and manage student details" />
      
      <div className="mt-8 flex gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Filter by term..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Filter by enrolled course..."
          value={enrolledCourse}
          onChange={(e) => setEnrolledCourse(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchStudents}>
          Filter
        </button>
      </div>

      {isLoading ? (
        <Loader text="Loading students..." />
      ) : (
        <div className="mt-4">
          {students.length > 0 ? (
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
                    ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Term
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Enrolled Courses
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <img src={student.avatar || "/default-avatar.png"} alt="Avatar" className="h-10 w-10 rounded-full" />
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {student.name}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {student.id}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {student.term}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {student.enrolled_courses.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No students found</p>
          )}
        </div>
      )}
    </div>
  );
}
