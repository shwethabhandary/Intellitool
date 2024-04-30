import React, { useState, useEffect } from 'react';
import { Loader, PageHeader } from '@/components';
import { toast } from 'react-hot-toast';

export default function User() {
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newRole, setNewRole] = useState('');

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        ...(userType && { user_type: userType }),
      }).toString();

      const response = await fetch(`/api/users?${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to load data: ' + error.message);
      setIsLoading(false);
    }
  };

  const addUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: newUsername, role: newRole }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const data = await response.json();
      setUsers([...users, data]);
      setNewUsername('');
      setNewRole('');
      toast.success('User added successfully');
      setIsLoading(false);
    } catch (error) {
      toast.error('Failed to add user: ' + error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="shadow-lg bg-white p-4 lg:p-10 mx-12 md:mx-24 lg:mx-48 my-12 rounded-lg text-lg">
      <PageHeader title="User Management" subTitle="View and manage all users" />
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Filter by user type..."
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        />
        <button 
          className="col-span-1 md:col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchUsers}
        >
          Filter
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <input
          className="border p-2 rounded"
          placeholder="Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="professor">Professor</option>
          <option value="admin">Admin</option>
        </select>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={addUser}
        >
          Add User
        </button>
      </div>

      {isLoading ? (
        <Loader text="Processing..." />
      ) : (
        <div className="mt-4">
          {users.length > 0 ? (
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.username}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users found</p>
          )}
        </div>
      )}
    </div>
  );
}
