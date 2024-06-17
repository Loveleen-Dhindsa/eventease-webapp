import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../services/api.service';

const LatestEvent = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const result = await getEvents();
            console.log('result', result);
            setEvents(result);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    const getImagePath = (category) => {
        const categoryImages = {
            'birthday': '/images/birthday.jpg',
            'music': '/images/music.jpg',
            'sports': '/images/sports.jpg',
        };
        return categoryImages[category] || '/images/default.jpg';
    };

    const getLatestEvents = () => {
        return events
            .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate)) // Sort by eventDate
            .slice(0, 3);
    };

    const latestEvents = getLatestEvents();

    return (
        <div className="container mt-5">
            <h2 className="px-3 mb-5">Featured Events</h2>
            <div class="row justify-content-center mb-5">
                <div className="row">
                    {latestEvents.map((event) => (
                        <div className="col-md-4 mb-4" key={event._id}>
                            <Link to={`/events/${event._id}`} className="card-link text-decoration-none">
                                <div className="card mx-auto">
                                    <img
                                        src={getImagePath(event.category)}
                                        className="card-img-top img-fluid"
                                        alt={event.category}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{event.eventName}</h5>
                                        <p className="card-text">{event.eventDescription}</p>
                                        <p className="card-text">{event.category}</p>
                                        <p className="card-text">{new Date(event.eventDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default LatestEvent;
