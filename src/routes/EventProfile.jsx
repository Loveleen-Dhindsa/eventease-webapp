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


    return (
        <div>
            {event ? (
                <div>
                    <h2>{event.eventName}</h2>
                    <p>{event.eventDescription}</p>
                    <p>{event.eventDate}</p>
                    <p>{event.eventLocation}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

};

export default EventProfile;