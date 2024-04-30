import React, { useState, useEffect } from 'react';
import { Loader, PageHeader } from '@/components';
import { toast } from 'react-hot-toast'; 

export default function Professor() {
  const [professors, setProfessors] = useState([]);
  const [fieldType, setFieldType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dummyProfessors = [
    { id: 1, name: "Dr. Alice Johnson", field: "Computer Science", courses: ["Data Structures", "Algorithms"], avatar: "/previews/avatar1.png" },
    { id: 2, name: "Dr. Bob Smith", field: "Mathematics", courses: ["Calculus", "Linear Algebra"], avatar: "/previews/avatar2.png" }
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

  return (
    <div className="shadow-lg bg-white p-4 lg:p-10 mx-12 md:mx-24 lg:mx-48 my-12 rounded-lg text-lg">
      <PageHeader title="Professor Management" subTitle="View and manage professor details" />
      
      <div className="mt-8 flex gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Filter by field..."
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchProfessors}>
          Filter
        </button>
      </div>

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
                    Field
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
                      {professor.field}
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
  );
}
