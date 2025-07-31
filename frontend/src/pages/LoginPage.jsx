import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-50 px-4">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-2xl shadow-md">
        <form onSubmit={handleLogin} className="space-y-4 w-full">
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div>
            <label className="block text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              className="w-full p-3 mt-1 bg-gray-100 rounded-lg focus:outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">Password</label>
            <input
              type="password"
              className="w-full p-3 mt-1 bg-gray-100 rounded-lg focus:outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-sm text-center pt-2">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
