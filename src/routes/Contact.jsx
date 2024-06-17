import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbTrash, TbEdit, TbPlus } from 'react-icons/tb';
import { Container } from "react-bootstrap"
import { createEvent, deleteEvent, updateEvent, getEvents, getContacts, deleteSingleContact } from '../services/api.service'
import { Button, Form, Input, Select, Table, Popconfirm, Modal } from 'antd';

export default function Contact() {
    const [contacts, setContacts] = useState([]);
    const [totalContacts, setTotalContacts] = useState([])
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
                const user = result;
                console.log('Deleted contact:', user);
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

                                <Table
                                    dataSource={contacts}
                                    pagination={{
                                        pageSize: 100,
                                    }}
                                >
                                    <Table.Column
                                        key={'name'}
                                        title={'Name'}
                                        dataIndex={'name'}
                                        render={(text, record) => (
                                            <Link to={`/contacts/${record._id}`}>{text}</Link>
                                        )}
                                    />
                                    <Table.Column
                                        key={'email'}
                                        title={'Email'}
                                        dataIndex={'email'}
                                    />
                                    <Table.Column
                                        key={'phone'}
                                        title={'Phone'}
                                        dataIndex={'phone'}
                                    />
                                    <Table.Column
                                        key={'message'}
                                        title={'Message'}
                                        dataIndex={'message'}
                                    />
                                    <Table.Column
                                        key={'createdAt'}
                                        title={'Date Created'}
                                        dataIndex={'createdAt'}
                                    />
                                    <Table.Column
                                        key="actions"
                                        title="Actions"
                                        render={(text, record) => (
                                            <div>
                                                <Popconfirm title="Are you sure you want to delete this contact?" onConfirm={() => handleDeleteContact(record._id)}>
                                                    <Button size='small'>
                                                        <TbTrash />
                                                    </Button>
                                                </Popconfirm>
                                            </div>
                                        )}
                                    />
                                </Table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    )
}
