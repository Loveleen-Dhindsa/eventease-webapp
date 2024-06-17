import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleContact } from '../services/api.service';
import { Card, Descriptions } from 'antd';

export default function ContactDetails() {
    const params = useParams();
    const contactId = params.contactId;
    const [contact, setContact] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSingleContact = async () => {
            try {
                const result = await getSingleContact(contactId);
                console.log('Fetched Single contact:', result);
                setContact(result);
                setLoading(false);
            } catch (error) {
                console.error('Error setting contact:', error);
                setLoading(false);
            }
        };

        fetchSingleContact();
    }, [contactId]);
    return (
        <div className="p-5">
            <Card title="Contact info">
                <Descriptions>
                    <Descriptions.Item label="Name">{contact?.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{contact?.email}</Descriptions.Item>
                    <Descriptions.Item label="Message">{contact?.message}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{contact?.phone}</Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {contact?.createdAt}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    )
}
