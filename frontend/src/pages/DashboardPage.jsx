import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecommendationCard from './RecommendationCard';
import './Dashboard.css';

const genreOptions = [
  'Sci-Fi',
  'Comedy',
  'Fantasy',
  'Drama',
  'Horror',
  'Thriller',
  'Action',
];

const Dashboard = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/login'); 
  };

  const fetchRecommendations = async () => {
    if (!selectedType) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      let response;
      
      if (selectedGenre) {
        // Get ML recommendations by both category and genre
        response = await axios.get(
          `http://localhost:8000/api/recommendations/ml/category/${selectedType}/genre/${selectedGenre}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        
        // Transform ML response to match our card structure
        const transformedData = response.data.map((item, index) => ({
          id: index + 1,
          title: item.title || item.name || 'Unknown Title',
          type: item.genre || item.category || selectedGenre,
          description: item.description || item.overview || 'No description available',
          rating: item.rating || item.vote_average || 0,
          imageUrl: item.poster_path || item.image_url || null
        }));
        
        setRecommendations(transformedData);
      } else {
        // Get recommendations by category only
        response = await axios.get(
          `http://localhost:8000/api/recommendations/category/${selectedType}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        
        setRecommendations(response.data);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // Fallback to dummy data if API fails
      let dummyData = [];
      switch (selectedType) {
        case 'books':
          dummyData = [
            { id: 1, title: 'Dune', type: 'Sci-Fi' },
            { id: 2, title: 'The Hobbit', type: 'Fantasy' },
            { id: 3, title: 'Gone Girl', type: 'Thriller' },
            { id: 4, title: 'The Shining', type: 'Horror' },
          ];
          break;
        case 'movies':
          dummyData = [
            { id: 5, title: 'Inception', type: 'Sci-Fi' },
            { id: 6, title: 'The Godfather', type: 'Drama' },
            { id: 7, title: 'Interstellar', type: 'Sci-Fi' },
            { id: 8, title: 'The Conjuring', type: 'Horror' },
          ];
          break;
        case 'tv':
          dummyData = [
            { id: 9, title: 'Stranger Things', type: 'Fantasy' },
            { id: 10, title: 'Breaking Bad', type: 'Drama' },
            { id: 11, title: 'The Boys', type: 'Action' },
          ];
          break;
        case 'podcast':
          dummyData = [
            { id: 12, title: 'Lore', type: 'Horror' },
            { id: 13, title: 'Serial', type: 'Thriller' },
            { id: 14, title: 'Science Vs', type: 'Sci-Fi' },
          ];
          break;
        default:
          dummyData = [];
      }

      const filtered = selectedGenre
        ? dummyData.filter((item) => item.type === selectedGenre)
        : dummyData;

      setRecommendations(filtered);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Top Left - Logout */}
      <button className="logout-button" onClick={handleLogout} title="Logout from this Account">
        Logout
      </button>

      {/* Top Right - Profile Icon */}
      <button
        onClick={() => navigate('/profile')}
        title="Go to Profile"
        className="profile-button"
      >
        👤
      </button>

      <div className="dashboard-title-section">
        <h1 className="dashboard-title">Your Dashboard</h1>
        <p className="dashboard-subtitle">What's next? Choose a category.</p>
      </div>

      <div className="category-buttons">
        {['tv', 'books', 'movies', 'podcast'].map((type) => (
          <button
            key={type}
            className={`dashboard-button ${selectedType === type ? 'selected' : ''}`}
            onClick={() => {
              setSelectedType(type);
              setRecommendations([]);
              setSelectedGenre('');
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {selectedType && (
        <div className="genre-section">
          <h3>Select a Genre:</h3>
          <div className="genre-buttons">
            {genreOptions.map((genre) => (
              <button
                key={genre}
                className={`genre-button ${selectedGenre === genre ? 'selected' : ''}`}
                onClick={() => setSelectedGenre((prev) => (prev === genre ? '' : genre))}
              >
                {genre}
              </button>
            ))}
          </div>
          <div className="recommend-button-wrapper">
            <button className="recommend-button" onClick={fetchRecommendations}>
              Recommend
            </button>
          </div>
        </div>
      )}

      <div className="recommendations-grid">
        {loading ? (
          <p className="no-recommendation">Loading recommendations...</p>
        ) : recommendations.length === 0 ? (
          <p className="no-recommendation">No recommendations found.</p>
        ) : (
          recommendations.map((item) => (
            <RecommendationCard 
              key={item.id} 
              title={item.title} 
              type={item.category || item.genre} 
              description={item.description}
              rating={item.rating}
              imageUrl={item.imageUrl}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
