import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleUser } from '../services/api.service';
import { Card, Table } from 'react-bootstrap';

const UserProfile = () => {
    const params = useParams();
    const userId = params.userId;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchSingleUser = async () => {
            try {
                const result = await getSingleUser(userId);
                console.log('Fetched Single User:', result);
                setUser(result);
            } catch (error) {
                console.error('Error setting user:', error);
            }
        };

        fetchSingleUser();
    }, [userId]);

    return (
        <div className="p-5">
            <Card>
                <Card.Header>User info</Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <td><strong>Name</strong></td>
                                <td>{user?.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Email</strong></td>
                                <td>{user?.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Created At</strong></td>
                                <td>{user?.createdAt}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    );
};

export default UserProfile;