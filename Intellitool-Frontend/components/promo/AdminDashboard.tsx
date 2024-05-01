// import React, { useState } from 'react';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

// interface User {
//   id: number;
//   username: string;
//   email: string;
//   role: string;
// }

// const AdminDashboard = () => {
//   const [signUpRequests, setSignUpRequests] = useState<User[]>([
//     { id: 1, username: 'user1', email: 'user1@example.com', role: 'student' },
//     { id: 2, username: 'user2', email: 'user2@example.com', role: 'professor' },
//     { id: 3, username: 'user3', email: 'user3@example.com', role: 'student' },
//   ]);

//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [userToReject, setUserToReject] = useState<User | null>(null);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   const openRejectModal = (user: User) => {
//     setUserToReject(user);
//     setShowRejectModal(true);
//   };

//   const closeRejectModal = () => {
//     setShowRejectModal(false);
//     setUserToReject(null);
//   };

//   const rejectRequest = () => {
//     if (!userToReject) return;
//     const updatedRequests = signUpRequests.filter((user) => user.id !== userToReject.id);
//     setSignUpRequests(updatedRequests);
//     setShowRejectModal(false);
//   };

//   const approveRequest = (id: number) => {
//     const updatedRequests = signUpRequests.filter((user) => user.id !== id);
//     setSignUpRequests(updatedRequests);
//     setShowSuccessMessage(true);
//     setTimeout(() => setShowSuccessMessage(false), 3000);
//   };

//   return (
//     <div className="container text-center">
//       <h2 className="mt-4">Admin Sign-Up Requests</h2>
//       {showSuccessMessage && (
//         <div className="alert alert-success mt-3" role="alert">
//           Successfully approved!
//         </div>
//       )}
//       <div className="table-responsive mt-4">
//         <table className="table table-bordered table-striped centered-table">
//           <thead>
//             <tr>
//               <th>Username</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {signUpRequests.map((request) => (
//               <tr key={request.id}>
//                 <td>{request.username}</td>
//                 <td>{request.email}</td>
//                 <td>{request.role}</td>
//                 <td>
//                   <button className="btn btn-success mr-2" onClick={() => approveRequest(request.id)}>Approve</button>
//                   <button className="btn btn-danger" onClick={() => openRejectModal(request)}>Reject</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* Reject Modal */}
//       <Modal show={showRejectModal} onHide={closeRejectModal} centered>
//         <Modal.Body className="modal-card">
//           <Card bg="light" text="dark">
//             <Card.Header>Reject Sign-Up Request</Card.Header>
//             <Card.Body>
//               <Card.Text>
//                 Are you sure you want to reject the sign-up request from <strong>{userToReject && userToReject.username}</strong>?
//               </Card.Text>
//             </Card.Body>
//             <Card.Footer>
//               <Button variant="secondary" onClick={closeRejectModal}>
//                 Cancel
//               </Button>
//               <Button variant="danger" onClick={rejectRequest}>
//                 Confirm Reject
//               </Button>
//             </Card.Footer>
//           </Card>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { FaCheck, FaTrash, FaSmile } from 'react-icons/fa'; // Import icons
import { getSession } from '.././../pages/session';
import { bgLinearGradientClassName } from '@/styles/styles';
import { textLinearGradientClassName } from "@/styles/styles";

const AdminDashboard = () => {
  // Sample data for demonstrationimport { getSession } from './session';import { getSession } from './session';
  const [users, setUsers] = useState([
    { id: 1, username: 'user1', role: 'student' },
    { id: 2, username: 'user2', role: 'professor' },
    // Add more sample data as needed
  ]);

  
  const { isLoggedIn, username, role } = getSession()
  const { TotalStudent, TotalProfessor, TotalCourses } = { TotalStudent: 3, TotalProfessor: 4, TotalCourses: 5 };

  useEffect(() => {
    // Fetch data or perform any initialization
  }, []);

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
      <h2 className={`${textLinearGradientClassName} font-bold text-lg mb-2`}> Grant /Deny Access to the Portal</h2>
      <table className="user-table">
        <thead>
          <tr className='user-tr-center'>
            <th>Sl. No.</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button className="approve-button" onClick={() => handleApprove(user.id)}>
                  <FaCheck color="green" size={20} />
                </button>
                <button className="reject-button" onClick={() => handleReject(user.id)}>
                  <FaTrash color="red" size={20} />
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
