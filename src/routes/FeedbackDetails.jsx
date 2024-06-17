import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleContact, getSingleFeedback } from '../services/api.service';
import { Card, Descriptions } from 'antd';

export default function FeedbackDetails() {
    const params = useParams();
    const feedbackId = params.feedbackId;
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSingleFeedback = async () => {
            try {
                const result = await getSingleFeedback(feedbackId);
                console.log('Fetched Single feedback:', result);
                setFeedback(result);
                setLoading(false);
            } catch (error) {
                console.error('Error setting feedback:', error);
                setLoading(false);
            }
        };

        fetchSingleFeedback();
    }, [feedbackId]);
    return (
        <div className="p-5">
            <Card title="Feedback info">
                <Descriptions>
                    <Descriptions.Item label="Name">{feedback?.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{feedback?.email}</Descriptions.Item>
                    <Descriptions.Item label="Message">{feedback?.message}</Descriptions.Item>
                    <Descriptions.Item label="Feedback Type">{feedback?.feedbackType}</Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {feedback?.createdAt}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    )
}
