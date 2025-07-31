// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import RecommendationCard from '../components/RecommendationCard';

function DashboardPage() {
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async (category) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:8000/api/recommendations?category=${category}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecommendations(response.data); 
    } catch (error) {
      console.error('Failed to fetch recommendations', error);
    }
  };

  return (
    <div>
      <h1>Your Dashboard</h1>
      <h2>What's next?</h2>
      <div>
        <button onClick={() => fetchRecommendations('books')}>Get Book Recommendations</button>
        <button onClick={() => fetchRecommendations('movies')}>Get Movie Recommendations</button>
      </div>

      <div className="recommendations-list">
        {recommendations.map((item) => (
          <RecommendationCard
            key={item.id}
            title={item.title}
            type={item.genre}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
