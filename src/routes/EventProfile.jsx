import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventsById } from '../services/api.service';


const EventProfile = () => {
    const params = useParams();
    const eventId = params.eventId;
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchSingleEvent = async () => {
            try {
                const result = await getEventsById(eventId);
                console.log('Fetched Single Events:', result);
                setEvent(result);
            } catch (error) {
                console.error('Error setting events:', error);
            }
        };

        fetchSingleEvent();
    }, [eventId]);


    return (
        <div className="single-event-section">
            <div className="container">
                <div className="row">
                    {event ? (
                        <div>
                            <img className="w-100 mb-5" src={event.image} alt={event.category} />
                            <h2 className="text-center">{event.eventName}</h2>
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