import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleFeedback } from '../services/api.service';
import { Card, Table } from 'react-bootstrap';

export default function FeedbackDetails() {
    const params = useParams();
    const feedbackId = params.feedbackId;
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        const fetchSingleFeedback = async () => {
            try {
                const result = await getSingleFeedback(feedbackId);
                console.log(result);
                setFeedback(result);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSingleFeedback();
    }, [feedbackId]);

    return (
        <div className="p-5">
            <Card>
                <Card.Header>Feedback info</Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <td><strong>Name</strong></td>
                                <td>{feedback?.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Email</strong></td>
                                <td>{feedback?.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Message</strong></td>
                                <td>{feedback?.message}</td>
                            </tr>
                            <tr>
                                <td><strong>Feedback Type</strong></td>
                                <td>{feedback?.feedbackType}</td>
                            </tr>
                            <tr>
                                <td><strong>Created At</strong></td>
                                <td>{feedback?.createdAt}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
}
