import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

const AdminDashboard = () => {
  const [signUpRequests, setSignUpRequests] = useState<User[]>([
    { id: 1, username: 'user1', email: 'user1@example.com', role: 'student' },
    { id: 2, username: 'user2', email: 'user2@example.com', role: 'professor' },
    { id: 3, username: 'user3', email: 'user3@example.com', role: 'student' },
  ]);

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [userToReject, setUserToReject] = useState<User | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const openRejectModal = (user: User) => {
    setUserToReject(user);
    setShowRejectModal(true);
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setUserToReject(null);
  };

  const rejectRequest = () => {
    if (!userToReject) return;
    const updatedRequests = signUpRequests.filter((user) => user.id !== userToReject.id);
    setSignUpRequests(updatedRequests);
    setShowRejectModal(false);
  };

  const approveRequest = (id: number) => {
    const updatedRequests = signUpRequests.filter((user) => user.id !== id);
    setSignUpRequests(updatedRequests);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="container text-center">
      <h2 className="mt-4">Admin Sign-Up Requests</h2>
      {showSuccessMessage && (
        <div className="alert alert-success mt-3" role="alert">
          Successfully approved!
        </div>
      )}
      <div className="table-responsive mt-4">
        <table className="table table-bordered table-striped centered-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {signUpRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.username}</td>
                <td>{request.email}</td>
                <td>{request.role}</td>
                <td>
                  <button className="btn btn-success mr-2" onClick={() => approveRequest(request.id)}>Approve</button>
                  <button className="btn btn-danger" onClick={() => openRejectModal(request)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Reject Modal */}
      <Modal show={showRejectModal} onHide={closeRejectModal} centered>
        <Modal.Body className="modal-card">
          <Card bg="light" text="dark">
            <Card.Header>Reject Sign-Up Request</Card.Header>
            <Card.Body>
              <Card.Text>
                Are you sure you want to reject the sign-up request from <strong>{userToReject && userToReject.username}</strong>?
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="secondary" onClick={closeRejectModal}>
                Cancel
              </Button>
              <Button variant="danger" onClick={rejectRequest}>
                Confirm Reject
              </Button>
            </Card.Footer>
          </Card>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
