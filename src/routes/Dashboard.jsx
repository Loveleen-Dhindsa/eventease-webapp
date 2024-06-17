import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbTrash, TbEdit, TbPlus } from 'react-icons/tb';
import EventList from './EventList'
import { Container } from "react-bootstrap"
import { createUser, deleteSingleUser, getUsers, updateUser } from '../services/api.service'
import { Button, Form, Input, Alert, Select, Table, Popconfirm, Modal } from 'antd';
const { Option } = Select;

export default function Dashboard() {
    const [message, setMessage] = useState(null);
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState([])
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const result = await getUsers();
            console.log('result', result);
            setUsers(result);
            setTotalUsers(result.length);
            setLoading(false);
        } catch (error) {
            console.error('Error', error);
            setLoading(false);
        }
    };

    const showModal = (user) => {
        if (user) {
            setIsUpdateMode(true);
            setCurrentUserId(user._id);
        } else {
            setIsUpdateMode(false);
        }
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
        setCurrentUserId(null);
    };

    const handleCreateOrUpdateUser = (values) => {

        if (isUpdateMode) {
            updateUser(currentUserId, {
                name: values.name,
                // email: values.email,
                password: values.password,
                phone: values.phone
            })
                .then(({ data: result }) => {
                    console.log('Updated user', result);
                    fetchUsers();
                    hideModal();
                })
                .catch((error) => {
                    console.log('Error updating user:', error);
                });
        } else {
            createUser({
                name: values.name,
                email: values.email,
                password: values.password,
                phone: values.phone
            })
                .then(({ data: result }) => {
                    console.log('Created user:', result);
                    fetchUsers();
                    hideModal();
                }).catch((error) => {
                    console.log('error', error)
                    setMessage({ type: 'error', content: 'Error Occured' });
                });
        }

    };

    const handleDeleteUser = (id) => {
        deleteSingleUser(id)
            .then(({ data: result }) => {
                const user = result;
                console.log('Deleted user:', user);
                fetchUsers();
            })
            .catch((error) => {
                console.log('Error deleting user:', error);
            })
    };

    return (
        <Container>
            <div className="dashboard-page-header p-3">
                <div className="row mt-3">
                    <div className="col-md-12">
                        <h3 className="text-center">Dashboard Page</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div>
                                <div className="row mb-3 mt-5">
                                    <div className="col-md-8">
                                        <h3>Total List of Users: {totalUsers}</h3>
                                    </div>

                                    <div className="col-md-4 text-end">
                                        <div className="dashboard-actions">
                                            <Button className="text-end" type="primary" onClick={() => showModal(null)}>
                                                <TbPlus /> New User
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <Table
                                    dataSource={users}
                                    pagination={{
                                        pageSize: 100,
                                    }}
                                >
                                    <Table.Column
                                        key={'name'}
                                        title={'Name'}
                                        dataIndex={'name'}
                                        render={(text, record) => (
                                            <Link to={`/users/${record._id}`}>{text}</Link>
                                        )}
                                    />
                                    <Table.Column key={'email'} title={'Email'} dataIndex={'email'} />
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
                                                <Popconfirm title="Are you sure you want to delete this user?" onConfirm={() => handleDeleteUser(record._id)}>
                                                    <Button size='small'>
                                                        <TbTrash />
                                                    </Button>
                                                </Popconfirm>

                                                <Button icon={<TbEdit />} onClick={() => showModal(record)} />

                                            </div>
                                        )}
                                    />
                                </Table>
                                <div className="row justify-content-center">
                                    <div className="col-md-10">
                                        <div className="form-wrapper auth-form">
                                            <Modal className="text-center fs-2"
                                                title={isUpdateMode ? "Update User" : "Create User"}
                                                open={isModalVisible}
                                                onCancel={hideModal}
                                                footer={false}
                                                destroyOnClose={true}
                                            >
                                                <Form layout="vertical" onFinish={handleCreateOrUpdateUser}>
                                                    <hr />

                                                    <Form.Item
                                                        name={'name'}
                                                        label="Name"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Please input your name!',
                                                            },
                                                        ]}
                                                        required={false}
                                                    >
                                                        <Input placeholder="Name" />
                                                    </Form.Item>

                                                    <Form.Item
                                                        name={'email'}
                                                        label="Email"
                                                        rules={[
                                                            { required: true, message: 'Please input your email!' },
                                                            { type: 'email', message: 'Please enter a valid email address.' },
                                                        ]}
                                                        required={false}
                                                    >
                                                        <Input placeholder="abc@gmail.com" />
                                                    </Form.Item>

                                                    <Form.Item
                                                        name={'password'}
                                                        label="Password"
                                                        required={false}
                                                        rules={[
                                                            { required: true, message: 'Please input your password!' },
                                                            { min: 6, message: 'Password must be at least 6 characters' },
                                                        ]}
                                                    >
                                                        <Input.Password placeholder="*******" type="password" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name={'phone'}
                                                        label="Phone"
                                                        required={false}
                                                        rules={[
                                                            { required: true, message: 'Please input your phone number!' },
                                                            { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number.' },
                                                        ]}
                                                    >
                                                        <Input placeholder="1234567890" autoComplete="off" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        name={'role'}
                                                        label="Role"
                                                        defaultValue="attendee"
                                                        rules={[
                                                            {
                                                                required: false,
                                                                message: 'Please select your role!',
                                                            },
                                                        ]}
                                                    >
                                                        <Select placeholder="Select a role">
                                                            <Option value="admin">Admin</Option>
                                                            <Option value="event-manager">Event Manager</Option>
                                                            <Option value="attendee">Attendee</Option>
                                                        </Select>
                                                    </Form.Item>
                                                    <Button className="btn-primary w-100 p-3" type="submit" htmlType='submit'>Create Account</Button>
                                                </Form>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container py-3">
                <div className="row">
                    <div className="col-md-12">
                        <EventList />
                    </div>
                </div>
            </div>
        </Container>
    )
}

