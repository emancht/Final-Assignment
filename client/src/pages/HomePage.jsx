
import { useEffect } from 'react';
import { getAllEvents } from '../api/events';
import { useEventStore } from '../app/store';
import EventList from '../components/events/EventList';
import HeroBanner from '../components/ui/HeroBanner';


const HomePage = () => {
  const { events, setEvents, setLoading } = useEventStore();
 

  useEffect(() => {
    const fetchEvents = async () => {
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

    fetchEvents();
  }, [setEvents, setLoading]);

  return (
    <div>
      <HeroBanner />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6 text-center">Upcoming Events</h2>
      
        <EventList events={events.slice(0, 6)} />
      </div>
    </div>
  );
};

export default HomePage;