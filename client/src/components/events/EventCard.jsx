
import { FaBookmark, FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../app/store';

const EventCard = ({ event, showActions = false }) => {
  const { currentUser } = useAuthStore();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:bg-indigo-50">
      <Link to={`/events/${event._id}`}>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link to={`/events/${event._id}`}>
            <h3 className="text-xl font-bold mb-2 hover:text-indigo-600 transition">
              {event.title}
            </h3>
          </Link>
          {showActions && currentUser?._id === event.creator._id && (
            <div className="flex space-x-2">
              <Link
                to={`/dashboard/edit/${event._id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </Link>
            </div>
          )}
        </div>
        <div className="flex items-center mb-2">
          <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {event.category}
          </span>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <FaCalendar className="mr-2 text-indigo-500" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-2 text-indigo-500" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-indigo-500" />
            <span>{event.location}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Link
            to={`/events/${event._id}`}
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
          >
            View Details
          </Link>
          <button className="text-gray-400 hover:text-indigo-600">
            <FaBookmark />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;