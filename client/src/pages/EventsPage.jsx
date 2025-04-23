
import { useEffect, useState } from 'react';
import { getAllEvents, getEventsByCategory, searchEvents } from '../api/events';
import { useEventStore } from '../app/store';
import EventList from '../components/events/EventList';
import CategoryFilter from '../components/ui/CategoryFilter';
import SearchBar from '../components/ui/SearchBar';

const EventsPage = () => {
  const { events, setEvents, setLoading } = useEventStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        let response;
        if (selectedCategory !== 'All') {
          response = await getEventsByCategory(selectedCategory);
        } else if (searchQuery) {
          response = await searchEvents(searchQuery);
        } else {
          response = await getAllEvents();
        }
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedCategory, searchQuery, setEvents, setLoading]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-indigo-600 text-center font-bold mb-6">All Events</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <SearchBar onSearch={setSearchQuery} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>
      <EventList events={events} />
    </div>
  );
};

export default EventsPage;