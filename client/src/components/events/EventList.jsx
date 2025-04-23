
import EventCard from './EventCard';

const EventList = ({ events, showActions = false }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No events found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event._id} event={event} showActions={showActions} />
      ))}
    </div>
  );
};

export default EventList;