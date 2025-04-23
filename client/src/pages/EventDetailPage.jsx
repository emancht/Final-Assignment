
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCalendar, FaClock, FaEdit, FaMapMarkerAlt, FaTrash } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteEvent, getEventById } from '../api/events';
import { useAuthStore, useEventStore } from '../app/store';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuthStore();
  const { setLoading } = useEventStore();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const response = await getEventById(id);
        setEvent(response.data);
      } catch (error) {
        toast.error('Failed to load event details');
        navigate('/events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, setLoading, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        toast.success('Event deleted successfully');
        navigate('/events');
      } catch (error) {
        toast.error('Failed to delete event');
      }
    }
  };

  if (!event) return <div className="container mx-auto px-4 py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
              {isAuthenticated && currentUser?._id === event.creator._id && (
                <div className="flex space-x-2">
                  <Link
                    to={`/dashboard/edit/${event._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit className="text-xl" />
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="text-xl" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center mb-2">
              <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {event.category}
              </span>
            </div>
            <p className="text-gray-700 mb-4">{event.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <FaCalendar className="text-indigo-500 mr-2" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <FaClock className="text-indigo-500 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-indigo-500 mr-2" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold mb-2">Organizer</h3>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  {event.creator.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{event.creator.name}</p>
                  <p className="text-sm text-gray-500">@{event.creator.username}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;