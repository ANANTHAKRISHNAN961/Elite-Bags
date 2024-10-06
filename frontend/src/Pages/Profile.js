import React from 'react';
import { useUser } from '../components/UserContext'; // Adjust the path as per your project structure
import SaveUserDetails from '../components/SaveUserDetails'; // Adjust the path as per your project structure

const Profile = () => {
  const { user } = useUser();

  if (!user) {
    return <p>Loading...</p>; // or redirect to login if user is not logged in
  }

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">User Details</h5>
          <p className="card-text"><strong>Username:</strong> {user.username}</p>
          <p className="card-text"><strong>Email:</strong> {user.email}</p>
          <p className="card-text"><strong>Roles:</strong> {user.roles.join(', ')}</p>
        </div>
      </div>
      <SaveUserDetails />
    </div>
  );
};

export default Profile;
