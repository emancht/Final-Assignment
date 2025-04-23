
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  return (
    <div className="relative h-96 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-indigo-900 opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Discover Amazing <br />
          <span className="text-indigo-200">Local Events</span>
        </h1>
        <p className="mt-4 max-w-2xl text-indigo-100 text-lg md:text-xl">
          Find, attend, and create events in your area. Connect with your community and explore new experiences.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Link
            to="/events"
            className="px-8 py-3 rounded-md border border-indigo-100 text-white font-medium hover:text-indigo-300 hover:border-indigo-300 transition"
          >
            Browse Events
          </Link>
          <Link
            to="/dashboard"
            className="px-8 py-3 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Create Event
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
