import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleContact } from '../services/api.service';
import { Card, Table } from 'react-bootstrap';

export default function ContactDetails() {
    const params = useParams();
    const contactId = params.contactId;
    const [contact, setContact] = useState(null);

    useEffect(() => {
        const fetchSingleContact = async () => {
            try {
                const result = await getSingleContact(contactId);
                console.log('Fetched Single contact:', result);
                setContact(result);
            } catch (error) {
                console.error('Error setting contact:', error);
            }
        };

        fetchSingleContact();
    }, [contactId]);

    return (
        <div className="p-5">
            <Card>
                <Card.Header>Contact info</Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <td><strong>Name</strong></td>
                                <td>{contact?.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Email</strong></td>
                                <td>{contact?.email}</td>
                            </tr>
                            <tr>
                                <td><strong>Message</strong></td>
                                <td>{contact?.message}</td>
                            </tr>
                            <tr>
                                <td><strong>Phone</strong></td>
                                <td>{contact?.phone}</td>
                            </tr>
                            <tr>
                                <td><strong>Created At</strong></td>
                                <td>{contact?.createdAt}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </div>
    )
}