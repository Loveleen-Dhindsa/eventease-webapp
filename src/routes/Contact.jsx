import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbTrash } from 'react-icons/tb';
import { Container, Table, Button } from "react-bootstrap";
import { getContacts, deleteSingleContact } from '../services/api.service';

export default function Contact() {
    const [contacts, setContacts] = useState([]);
    const [totalContacts, setTotalContacts] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const result = await getContacts();
            console.log('result', result);
            setContacts(result);
            setTotalContacts(result.length);
            setLoading(false);
        } catch (error) {
            console.error('Error', error);
            setLoading(false);
        }
    };

    const handleDeleteContact = (id) => {
        deleteSingleContact(id)
            .then(({ data: result }) => {
                console.log('Deleted contact:', result);
                fetchContacts();
            })
            .catch((error) => {
                console.log('Error deleting contact:', error);
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
                                        <h3>Total List of Contacts: {totalContacts}</h3>
                                    </div>
                                </div>

                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Message</th>
                                            <th>Date Created</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contacts.map((contact) => (
                                            <tr key={contact._id}>
                                                <td><Link to={`/contacts/${contact._id}`}>{contact.name}</Link></td>
                                                <td>{contact.email}</td>
                                                <td>{contact.phone}</td>
                                                <td>{contact.message}</td>
                                                <td>{contact.createdAt}</td>
                                                <td>
                                                    <Button variant="danger" size="sm" onClick={() => handleDeleteContact(contact._id)}>
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