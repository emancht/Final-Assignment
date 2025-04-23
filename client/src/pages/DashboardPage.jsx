
import { useEffect } from 'react';
import { FaCalendarAlt, FaPlus, FaUser } from 'react-icons/fa';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/auth';
import { getAllEvents } from '../api/events';
import { useAuthStore, useEventStore } from '../app/store';
import EventForm from '../components/events/EventForm';
import EventList from '../components/events/EventList';

const DashboardPage = () => {
  const { currentUser, setUser } = useAuthStore();
  const { events, setEvents, setLoading } = useEventStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchUserEvents = async () => {
      setLoading(true);
      try {
        const response = await getAllEvents();
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchUserEvents();
  }, [setUser, setEvents, setLoading]);

  const userEvents = events.filter(
    (event) => event.creator._id === currentUser?._id
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4 h-fit">
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <FaUser className="text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold">{currentUser?.name}</h3>
              <p className="text-sm text-gray-500">@{currentUser?.username}</p>
            </div>
          </div>

          <nav className="space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-indigo-50 text-indigo-700 font-medium"
            >
              <FaCalendarAlt />
              <span>My Events</span>
            </Link>
            <Link
              to="/dashboard/create"
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition"
            >
              <FaPlus />
              <span>Create Event</span>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1 className="text-2xl font-bold mb-6">My Events</h1>
                  {userEvents.length > 0 ? (
                    <EventList events={userEvents} showActions />
                  ) : (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                      <p className="text-gray-500 mb-4">You haven't created any events yet.</p>
                      <Link
                        to="/dashboard/create"
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                      >
                        <FaPlus className="mr-2" />
                        Create Your First Event
                      </Link>
                    </div>
                  )}
                </>
              }
            />
            <Route path="/create" element={<EventForm />} />
            <Route path="/edit/:id" element={<EventForm isEdit />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;