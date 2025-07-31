import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfilePage.css';

function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { name, email } = response.data;
        setName(name);
        setEmail(email);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const payload = { name, email };
      if (password) payload.password = password;

      await axios.put('http://localhost:8000/api/user/profile', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Profile updated!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const deleteProfile = async () => {
    const confirmDelete = window.confirm(
      '⚠️ Are you sure you want to delete your profile? This action cannot be undone.'
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');

      await axios.delete('http://localhost:8000/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });

      localStorage.removeItem('token');
      alert('Your profile has been deleted.');
      navigate('/login');
    } catch (error) {
      console.error('Error deleting profile:', error);
      alert('Failed to delete profile.');
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="profile-container">
      {/* Back button */}
      <button className="back-button" onClick={handleBack}>
        Back to Dashboard
      </button>

      <h2>Update Profile</h2>

      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>New Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button className="primary-button" onClick={updateProfile}>
          Update Profile
        </button>
        <button className="danger-button" onClick={deleteProfile}>
          Delete Profile
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
