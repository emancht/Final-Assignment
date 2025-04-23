
import { FaPlus, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../api/auth';
import { useAuthStore } from '../../app/store';

const Header = () => {
  const { currentUser, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">       
          <span className="text-3xl font-bold text-purple-200">🎉 MeetSphere</span>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-indigo-200 transition">
            Home
          </Link>
          <Link to="/events" className="hover:text-indigo-200 transition">
            Events
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center space-x-1 hover:text-indigo-200 transition"
              >
                <FaUser />
                <span>{currentUser?.name}</span>
              </Link>
              <Link
                to="/dashboard/create"
                className="flex items-center space-x-1 bg-white text-indigo-600 px-3 py-1 rounded-md hover:bg-indigo-50 transition"
              >
                <FaPlus />
                <span>Create Event</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 hover:text-indigo-200 transition"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="hover:text-indigo-200 transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-indigo-600 px-4 py-1 rounded-md hover:bg-indigo-50 transition"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
