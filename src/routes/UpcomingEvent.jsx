import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUpcomingEvents } from '../services/api.service';

const UpcomingEvent = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const result = await getUpcomingEvents();
        console.log(result);
        setUpcomingEvents(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchUpcomingEvents();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Upcoming Events</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {upcomingEvents.map((event) => (
          <div className="col-md-4 mb-4" key={event._id}>
            <Link to={`/events/${event._id}`} className="card-link text-decoration-none">
              <div className="card mx-auto event-card">
                <img
                  src={event.image}
                  className="card-img-top rounded-top latest-event-img"
                  alt={event.category}
                />
                <div className="card-body">
                  <h5 className="card-title">{event.eventName}</h5>
                  <p className="card-text">{event.eventDescription}</p>
                  <p className="card-text"><strong>Category:</strong> {event.category}</p>
                  <p className="card-text"><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>

                  <button className="btn-secondary event-button">
                    More Details
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvent;
