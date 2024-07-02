import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbTrash } from 'react-icons/tb';
import { Container, Table, Button } from "react-bootstrap";
import { getFeedback, deleteSingleFeedback } from '../services/api.service';

export default function Feedback() {
    const [feedback, setFeedback] = useState([]);
    const [totalFeedback, setTotalFeedback] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const result = await getFeedback();
            console.log('result', result);
            setFeedback(result);
            setTotalFeedback(result.length);
            setLoading(false);
        } catch (error) {
            console.error('Error', error);
            setLoading(false);
        }
    };

    const handleDeleteFeedback = (id) => {
        deleteSingleFeedback(id)
            .then(({ data: result }) => {
                console.log('Deleted Feedback:', result);
                fetchFeedback();
            })
            .catch((error) => {
                console.log('Error deleting Feedback:', error);
            })
    };

    return (
        <Container>
            <div className="dashboard-page-header p-3">
                <div className="row">
                    <div className="col-md-12">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div>
                                <div className="row mb-3">
                                    <div className="col-md-8">
                                        <h3>Total List of Feedbacks: {totalFeedback}</h3>
                                    </div>
                                </div>

                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Message</th>
                                            <th>Feedback Type</th>
                                            <th>Date Created</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {feedback.map((item) => (
                                            <tr key={item._id}>
                                                <td><Link to={`/feedback/${item._id}`}>{item.name}</Link></td>
                                                <td>{item.email}</td>
                                                <td>{item.message}</td>
                                                <td>{item.feedbackType}</td>
                                                <td>{item.createdAt}</td>
                                                <td>
                                                    <Button variant="danger" size="sm" onClick={() => handleDeleteFeedback(item._id)}>
                                                        <TbTrash />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
}
