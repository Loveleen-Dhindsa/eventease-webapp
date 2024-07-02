import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/api.service';

const LatestEvent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const result = await getEvents();
            console.log('result', result);
            setEvents(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const getLatestEvents = () => {
        return events
            .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate)) // Sort by eventDate
            .slice(0, 3);
    };

    const latestEvents = getLatestEvents();

    return (
        <div className="container mt-2">
            <h2 className="text-center mb-5">Latest Awesome Events</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {latestEvents.map((event) => (
                    <div className="col" key={event._id}>
                        <Link to={`/events/${event._id}`} className="text-decoration-none">
                            <div className="card event-card h-100 border-0 shadow-sm">
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

export default LatestEvent;
