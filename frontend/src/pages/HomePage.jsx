// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome!</h1>
      <p>Please choose an option:</p>
      <Link to="/login">
        <button style={{ margin: '0.5rem' }}>Login</button>
      </Link>
      <Link to="/register">
        <button style={{ margin: '0.5rem' }}>Register</button>
      </Link>
    </div>
  );
}

export default HomePage;