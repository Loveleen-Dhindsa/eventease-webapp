import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getEventsById } from '../services/api.service';


const EventProfile = () => {
    const params = useParams();
    const eventId = params.eventId;
    console.log('id-----------', eventId);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSingleEvent = async () => {
            try {
                const result = await getEventsById(eventId);
                console.log('Fetched Single Events:', result);
                setEvent(result);
                setLoading(false);
            } catch (error) {
                console.error('Error setting events:', error);
                setLoading(false);
            }
        };

        fetchSingleEvent();
    }, [eventId]);

    const getImagePath = (category) => {
        const categoryImages = {
            'birthday': '/images/birthday.jpg',
            'music': '/images/music.jpg',
            'sports': '/images/sports.jpg',
            // Add more categories and their corresponding images as needed
        };
        return categoryImages[category] || '/images/default.jpg';
    };


    return (
        <div className="single-event-section">
            <div className="container">
                <div className="row">
                    {event ? (
                        <div>
                            <img className="w-100 mb-5 mt-5" src={getImagePath(event.category)} alt={event.category} />
                            <h2>{event.eventName}</h2>
                            <p className="lead">{event.eventDescription}</p>
                            <p>{event.eventDate}</p>
                            <p>{event.eventLocation}</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}

                </div>
            </div>
        </div>
    );

};

export default EventProfile;