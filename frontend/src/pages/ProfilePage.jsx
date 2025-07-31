// src/pages/ProfilePage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilePage() {
  // Example genres - you should fetch these from your API
  const availableGenres = ['Sci-Fi', 'Fantasy', 'Drama', 'Comedy', 'Thriller'];
  const [selectedGenres, setSelectedGenres] = useState([]);

  // In a real app, you would fetch the user's currently saved genres
  // useEffect(() => { fetchUserGenres(); }, []);

  const handleGenreChange = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre) // Uncheck
        : [...prevGenres, genre] // Check
    );
  };

  const savePreferences = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:8000/api/user/preferences',
        { genres: selectedGenres },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Preferences saved!');
    } catch (error) {
      console.error('Failed to save preferences', error);
    }
  };

  return (
    <div>
      <h2>Your Genre Preferences</h2>
      <p>Select your favorite genres to get better recommendations.</p>
      <div>
        {availableGenres.map((genre) => (
          <label key={genre}>
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre)}
              onChange={() => handleGenreChange(genre)}
            />
            {genre}
          </label>
        ))}
      </div>
      <button onClick={savePreferences}>Save Preferences</button>
    </div>
  );
}

export default ProfilePage;