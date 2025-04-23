// src/App.jsx
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getCurrentUser } from './api/auth';
import { useAuthStore } from './app/store';
import EventForm from './components/events/EventForm'; // Import here
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import PrivateRoute from './components/layout/PrivateRoute';
import DashboardPage from './pages/DashboardPage';
import EventDetailPage from './pages/EventDetailPage';
import EventsPage from './pages/EventsPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const { isAuthenticated, login, setUser } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuthenticated) {
          const response = await getCurrentUser();
          if (response?.data) {
            login(response.data, response.token);
          }
        }
      } catch (error) {
        console.log('Authentication check failed', error);
      }
    };

    checkAuth();
  }, [isAuthenticated, login, setUser]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/events" element={<EventsPage />} />
  <Route path="/events/:id" element={<EventDetailPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />

  {/* Protected routes */}
  <Route
    path="/dashboard"
    element={
      <PrivateRoute>
        <DashboardPage />
      </PrivateRoute>
    }
  />
  <Route
    path="/dashboard/create"
    element={
      <PrivateRoute>
        <EventForm />
      </PrivateRoute>
    }
  />
  <Route
    path="/dashboard/edit/:id"
    element={
      <PrivateRoute>
        <EventForm isEdit />
      </PrivateRoute>
    }
  />
</Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
