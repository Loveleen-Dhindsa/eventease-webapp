import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUpcomingEvents } from '../services/api.service';

const UpcomingEvent = () => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                const result = await getUpcomingEvents();
                console.log('result', result);
                setUpcomingEvents(result);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
        fetchUpcomingEvents();
    }, []);

    const getImagePath = (category) => {
        const categoryImages = {
            'birthday': '/images/birthday.jpg',
            'music': '/images/music.jpg',
            'sports': '/images/sports.jpg',
        };
        return categoryImages[category] || '/images/default.jpg';
    };

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="row">
                    <h2 className="px-3 mb-5">Upcoming Events</h2>
                    {upcomingEvents.map((event) => (
                        <div className="col-md-4 mb-5" key={event._id}>
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
            )}
        </div>
    );
};

export default UpcomingEvent;
