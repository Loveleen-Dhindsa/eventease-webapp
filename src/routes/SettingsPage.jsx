import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { getAccessToken, getUserFromLocalstorage } from '../services/localstorage';
import { updateAccount } from '../services/api.service';

const SettingsPage = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        profileUrl: 'https://via.placeholder.com/150',
    });

    useEffect(() => {
        const token = getAccessToken();
        const userData = getUserFromLocalstorage();

        if (token && userData) {
            setUser(userData);
            setFormData({
                name: userData.name,
                email: userData.email,
                profileUrl: userData.profileUrl || 'https://via.placeholder.com/150',
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profileUrl: reader.result });
            };
            reader.readAsDataURL(file); // This converts the file to a base64 string
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email) {
            updateAccount(formData)
                .then((response) => {
                    console.log('Response data:', response.data);
                    setUser(response.data);
                    console.log('Updated user state:', user);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    setMessage({ type: 'success', content: 'Updated successfully!' });
                })
                .catch((error) => {
                    console.log('error', error);
                    setMessage({ type: 'error', content: 'Invalid Data' });
                });
        } else {
            setMessage({ type: 'error', content: 'Name and email are required!' });
        }
    };

    return (
        <div className="container">

            <h1 className="mt-5 mb-5 text-center">Manage Your Account</h1>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card text-center p-3">
                        <div className="card-header mb-3">Profile Settings</div>
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Group className="mb-4">
                                {message && (
                                    <Alert variant={message.type} className="mb-3">
                                        {message.content}
                                    </Alert>
                                )}
                                <div className="d-flex flex-column align-items-center">
                                    <div className="circle-image">
                                        <img
                                            src={formData.profileUrl}
                                            alt="Profile"
                                            className="w-100 h-100 mb-3"
                                        />
                                    </div>
                                    <Button variant="secondary" onClick={() => document.getElementById('fileInput').click()}>
                                        Change Profile
                                    </Button>
                                    <Form.Group className="mb-3 d-none">
                                        <Form.Label>Profile Image</Form.Label>
                                        <Form.Control
                                            id="fileInput"
                                            type="file"
                                            onChange={handleFileChange}
                                            required
                                        />
                                    </Form.Group>
                                </div>
                                <Form.Label className="d-flex text-left mt-2">Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label className="d-flex text-left">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled
                                />
                            </Form.Group>
                            <Button variant="secondary" type="submit" className="w-15 mt-3 mb-3">
                                Update Account
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
            <div className="mt-5 text-center mb-5">
                <Link to="/" className="btn btn-primary p-2">Back to Home</Link>
            </div>
        </div>

    );
};

export default SettingsPage;