import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getEventsById } from '../services/api.service';
import { Card, Descriptions } from 'antd';

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
        <div className="p-5">
            <Card title="event info">
                <Descriptions>
                    <Descriptions.Item label="Event Name">{event?.eventName}</Descriptions.Item>
                    <Descriptions.Item label="Event Description">{event?.eventDescription}</Descriptions.Item>
                    <Descriptions.Item label="Event Date">{event?.eventDate}</Descriptions.Item>
                    <Descriptions.Item label="Event Location">{event?.eventLocation}</Descriptions.Item>
                    <Descriptions.Item label="Category">{event?.category}</Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {event?.createdAt}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>

    );

};

export default EventProfile;