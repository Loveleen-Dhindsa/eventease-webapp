import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbTrash, TbEdit, TbPlus } from 'react-icons/tb';
import { Container, Button, Form, Modal, Table, InputGroup, DropdownButton, Dropdown } from "react-bootstrap";
import { createUser, deleteSingleUser, getUsers, updateUser } from '../services/api.service';
import { clearAccessToken, clearUserFromLocalstorage } from '../services/localstorage';

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'attendee'
    });

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
            setFormValues(user);
        } else {
            setIsUpdateMode(false);
            setFormValues({
                name: '',
                email: '',
                password: '',
                phone: '',
                role: 'attendee'
            });
        }
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
        setCurrentUserId(null);
    };

    const handleCreateOrUpdateUser = async (event) => {
        event.preventDefault();
        const { name, email, password, phone, role } = formValues;

        if (isUpdateMode) {
            try {
                await updateUser(currentUserId, { name, email, password, phone, role });
                fetchUsers();
                hideModal();
            } catch (error) {
                console.error('Error updating user:', error);
            }
        } else {
            try {
                await createUser({ name, email, password, phone, role });
                fetchUsers();
                hideModal();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteSingleUser(id);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleChange = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };

    const handleRoleChange = (role) => {
        setFormValues({ ...formValues, role });
    };

    const handleLogout = () => {
        clearAccessToken();
        clearUserFromLocalstorage();
        window.location.href = '/login';
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
                                        <h3>Total List of Users: {totalUsers}</h3>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="d-flex justify-content-end">
                                            <Button className="mx-2 justify-content-end" variant="primary" onClick={() => showModal(null)}>
                                                <TbPlus /> New User
                                            </Button>
                                            <Button
                                                type="text"
                                                onClick={handleLogout}
                                                className="btn btn-secondary p-2 mx-2"
                                            >
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Role</th>
                                            <th>Email</th>
                                            <th>Date Created</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(user => (
                                            <tr key={user._id}>
                                                <td><Link to={`/users/${user._id}`}>{user.name}</Link></td>
                                                <td>{user.role}</td>
                                                <td>{user.email}</td>
                                                <td>{user.createdAt}</td>
                                                <td>
                                                    <Button variant="danger" size="sm" className="m-2" onClick={() => handleDeleteUser(user._id)}>
                                                        <TbTrash />
                                                    </Button>
                                                    <Button variant="secondary" size="sm" onClick={() => showModal(user)}>
                                                        <TbEdit />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                                <Modal show={isModalVisible} onHide={hideModal} centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{isUpdateMode ? "Update User" : "Create User"}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={handleCreateOrUpdateUser}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter name"
                                                    name="name"
                                                    value={formValues.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="Enter email"
                                                    name="email"
                                                    value={formValues.email}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={isUpdateMode}
                                                />
                                            </Form.Group>

                                            {!isUpdateMode && (
                                                <>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Password</Form.Label>
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Enter password"
                                                            name="password"
                                                            value={formValues.password}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Phone</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Enter phone number"
                                                            name="phone"
                                                            value={formValues.phone}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </Form.Group>
                                                </>
                                            )}

                                            <Form.Group className="mb-3">
                                                <Form.Label>Role</Form.Label>
                                                <InputGroup>
                                                    <DropdownButton
                                                        variant="outline-secondary"
                                                        title={formValues.role}
                                                        onSelect={handleRoleChange}
                                                    >
                                                        <Dropdown.Item eventKey="admin">Admin</Dropdown.Item>
                                                        <Dropdown.Item eventKey="event-manager">Event Manager</Dropdown.Item>
                                                        <Dropdown.Item eventKey="attendee">Attendee</Dropdown.Item>
                                                    </DropdownButton>
                                                </InputGroup>
                                            </Form.Group>
                                            <Button variant="primary" type="submit" className="w-100">
                                                {isUpdateMode ? 'Update User' : 'Create Account'}
                                            </Button>
                                        </Form>
                                    </Modal.Body>
                                </Modal>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
}
