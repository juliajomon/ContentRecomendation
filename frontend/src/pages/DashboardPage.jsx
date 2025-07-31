import { useState, useEffect } from 'react';
import axios from 'axios';
import RecommendationCard from '../components/RecommendationCard';

function DashboardPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecommendations = async (category) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `http://localhost:8000/api/recommendations?category=${category}`
      );
      setRecommendations(response.data); 
    } catch (error) {
      console.error('Failed to fetch recommendations', error);
      setError('Failed to fetch recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Your Dashboard</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">What's next?</h2>
        
        <div className="flex justify-center gap-4 mb-8">
          <button 
            onClick={() => fetchRecommendations('books')}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Loading...' : 'Get Book Recommendations'}
          </button>
          <button 
            onClick={() => fetchRecommendations('movies')}
            disabled={loading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Loading...' : 'Get Movie Recommendations'}
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4">{error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((item) => (
            <RecommendationCard
              key={item.id}
              title={item.title}
              type={item.genre}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>

        {recommendations.length === 0 && !loading && !error && (
          <div className="text-center text-gray-500 mt-8">
            Click a button above to get recommendations
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
