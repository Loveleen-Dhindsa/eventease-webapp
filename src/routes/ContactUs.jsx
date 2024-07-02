import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { createContact } from '../services/api.service';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarker } from 'react-icons/fa';

export default function ContactUs() {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCreateContactForm = async (event) => {
        event.preventDefault();
        const { name, email, phone, message } = formData;
        try {
            await createContact({ name, email, phone, message });
            navigate('/thank-you');
            setMessage({ type: 'success', content: 'Submit successful!' });
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', content: 'Error Occured' });
        }
    }


    return (
        <div className="contact-us-section">
            <div className="contact-title-section text-white text-center d-flex align-items-center justify-content-center">
                <h1>Contact Us</h1>
            </div>
            <div className="container py-5">
                <div className="row justify-content-center text-center">
                    <div className="col-md-12 py-5">
                        <p>If you have any questions, please feel free to reach out to us. We are here to help you!</p>
                    </div>
                    <div className="col-md-10 text-center mt-3 mb-5">
                        <Row>
                            <Col>
                                <h3><FaEnvelope /> Email</h3>
                                <p>abc@example.com</p>
                            </Col>
                            <Col>
                                <h3><FaPhone /> Phone</h3>
                                <p>+9876543210</p>
                            </Col>
                            <Col>
                                <h3><FaMapMarker /> Address</h3>
                                <p> Street, City, Country</p>
                            </Col>
                        </Row>
                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="form-wrapper bg-light mt-2 p-5">
                                    <Form onSubmit={handleCreateContactForm}>
                                        {message && (
                                            <Alert variant={message.type} className="mb-3">
                                                {message.content}
                                            </Alert>
                                        )}
                                        <Form.Group className="mb-4">
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
                                            <Form.Label className="d-flex text-left">Phone</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter phone number"
                                                name="phone"
                                                value={formData.phone}
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
                                        <Button variant="primary" type="submit" className="w-100">
                                            Send Message
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}