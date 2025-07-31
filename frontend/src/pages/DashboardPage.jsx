import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import './Dashboard.css'; // 👈 Link to the new CSS file

const RecommendationCard = ({ title, type, imageUrl }) => (
  <div className="recommendation-card">
    <img
      src={imageUrl || 'https://via.placeholder.com/300x180'}
      alt={title}
      className="card-image"
    />
    <div className="card-content">
      <h3 className="card-title">{title}</h3>
      <p className="card-type">{type}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  const fetchRecommendations = (type) => {
    const dummyData = type === 'books'
      ? [
          { id: 1, title: 'The Alchemist', type: 'Fiction', imageUrl: '' },
          { id: 2, title: 'Atomic Habits', type: 'Self-Help', imageUrl: '' },
        ]
      : [
          { id: 3, title: 'Inception', type: 'Sci-Fi', imageUrl: '' },
          { id: 4, title: 'The Godfather', type: 'Crime', imageUrl: '' },
        ];
    setRecommendations(dummyData);
  };

  return (
    <div className="dashboard-container">
      {/* Profile Icon */}
      <div className="profile-icon">
        <button
          onClick={() => navigate('/profile')}
          title="Go to Profile"
          className="profile-button"
        >
          <FiUser />
        </button>
      </div>

      {/* Main Box */}
      <div className="dashboard-box">
        <div className="dashboard-title-section">
          <h1 className="dashboard-title">Your Dashboard</h1>
          <p className="dashboard-subtitle">What’s next? Choose a category.</p>
        </div>

        {/* Buttons */}
        <div className="button-section">
          <button className="dashboard-button blue" onClick={() => fetchRecommendations('books')}>
            Book Recommendations
          </button>
          <button className="dashboard-button purple" onClick={() => fetchRecommendations('movies')}>
            Movie Recommendations
          </button>
        </div>

        {/* Cards */}
        <div className="recommendations-grid">
          {recommendations.length === 0 ? (
            <p className="no-recommendation">No recommendations yet. Choose a category above!</p>
          ) : (
            recommendations.map((item) => (
              <RecommendationCard
                key={item.id}
                title={item.title}
                type={item.type}
                imageUrl={item.imageUrl}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
