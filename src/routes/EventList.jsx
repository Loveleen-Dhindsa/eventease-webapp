import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbSearch } from 'react-icons/tb';
import { getEvents } from '../services/api.service'

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const result = await getEvents();
      setEvents(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getFilteredEvents = () => {
    if (!searchQuery) {
      return events;
    }
    return events.filter(event =>
      event.category && event.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };


  const filteredEvents = getFilteredEvents();

  return (
    <div className="container mt-5">
      <div class="row justify-content-center mb-5">
        <div className="col-md-6 mt-3">
          <div className="input-group">
            <span className="input-group-text"><TbSearch size={25} /></span>
            <input type="text" className="form-control" placeholder="Search Category....." onChange={handleSearchChange} />
          </div>
        </div>
      </div>
      <div className="row mb-5">
        {filteredEvents.map((event) => (
          <div className="col-md-4 mb-5" key={event._id}>
            <Link to={`/events/${event._id}`} className="card-link text-decoration-none">
              <div className="card mx-auto">
                <img
                  src={event.image}
                  className="card-img-top rounded-top latest-event-img"
                  alt={event.category}
                />
                <div className="card-body">
                  <h5 className="card-title no-decoration">{event.eventName}</h5>
                  <p className="card-text no-decoration">{event.eventDescription}</p>
                  <p className="card-text no-decoration">{event.category}</p>

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
  )
}

