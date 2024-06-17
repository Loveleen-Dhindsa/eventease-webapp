import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbTrash, TbEdit, TbPlus } from 'react-icons/tb';
import { Container } from "react-bootstrap"
import { createEvent, deleteEvent, updateEvent, getEvents, getContacts, deleteSingleContact, getFeedback, deleteSingleFeedback } from '../services/api.service'
import { Button, Form, Input, Select, Table, Popconfirm, Modal } from 'antd';

export default function Feedback() {
    const [Feedback, setFeedback] = useState([]);
    const [totalFeedback, setTotalFeedback] = useState([])
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
                const user = result;
                console.log('Deleted Feedback:', user);
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

                                <Table
                                    dataSource={Feedback}
                                    pagination={{
                                        pageSize: 100,
                                    }}
                                >
                                    <Table.Column
                                        key={'name'}
                                        title={'Name'}
                                        dataIndex={'name'}
                                        render={(text, record) => (
                                            <Link to={`/Feedback/${record._id}`}>{text}</Link>
                                        )}
                                    />
                                    <Table.Column
                                        key={'email'}
                                        title={'Email'}
                                        dataIndex={'email'}
                                    />
                                    <Table.Column
                                        key={'message'}
                                        title={'Message'}
                                        dataIndex={'message'}
                                    />
                                    <Table.Column
                                        key={'feedbackType'}
                                        title={'Feedback Type'}
                                        dataIndex={'feedbackType'}
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
                                                <Popconfirm title="Are you sure you want to delete this feedback?" onConfirm={() => handleDeleteFeedback(record._id)}>
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
