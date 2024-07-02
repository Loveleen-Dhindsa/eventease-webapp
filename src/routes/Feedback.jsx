import React, { useState } from 'react';
import { Button, Form, Alert, InputGroup, DropdownButton, Dropdown } from "react-bootstrap";

import { createFeedback } from '../services/api.service';
import { useNavigate } from 'react-router-dom';

export default function Feedback() {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedbackType: 'positive',
        message: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRoleChange = (feedbackType) => {
        setFormData({ ...formData, feedbackType });
    };

    const handleCreateFeedbackForm = async (event) => {
        event.preventDefault();
        const { name, email, feedbackType, message } = formData;
        try {
            var res = await createFeedback({ name, email, feedbackType, message });
            console.log(res)
            navigate('/thank-you');
            setMessage({ type: 'success', content: 'Submit successful!' });
        } catch (error) {
            console.error('Error creating user:', error);
            setMessage({ type: 'error', content: 'Error Occured' });
        }
    }
    return (
        <div className="contact-us-section">
            <div className="container py-5">
                <div className="row justify-content-center text-center">
                    <div className="col-md-6">
                        <div className="form-wrapper bg-lightp-5">
                            <Form onSubmit={handleCreateFeedbackForm}>
                                <Form.Group className="mb-4">
                                    {message && (
                                        <Alert variant={message.type} className="mb-3">
                                            {message.content}
                                        </Alert>
                                    )}
                                    <Form.Label className="d-flex text-left">Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
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
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label className="d-flex text-left">Message</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="d-flex text-left">Feedback Type</Form.Label>
                                    <InputGroup>
                                        <DropdownButton
                                            variant="outline-secondary"
                                            title={formData.feedbackType}
                                            onSelect={handleRoleChange}
                                        >
                                            <Dropdown.Item eventKey="positive">Positive</Dropdown.Item>
                                            <Dropdown.Item eventKey="negative">Negative</Dropdown.Item>
                                            <Dropdown.Item eventKey="neutral">Neutral</Dropdown.Item>
                                        </DropdownButton>
                                    </InputGroup>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Send Message
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
