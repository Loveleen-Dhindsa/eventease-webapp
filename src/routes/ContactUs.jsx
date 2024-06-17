import React, { useState } from 'react'
import { Form, Input, Button, Row, Col, Alert } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { createContact } from '../services/api.service';
import { Link, useNavigate } from 'react-router-dom';
const { TextArea } = Input;

export default function ContactUs() {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);


    const handleCreateContactForm = (values) => {
        createContact({
            name: values.name,
            email: values.email,
            message: values.message,
            phone: values.phone
        })
            .then((response) => {
                console.log('Response:', response);
                navigate('/thank-you');
                setMessage({ type: 'success', content: 'Submit successful!' });
            }).catch((error) => {
                console.log('error', error)
                setMessage({ type: 'error', content: 'Please enter valid information' });
            });
    };

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
                        <Row gutter={12}>
                            <Col span={8}>
                                <h3><MailOutlined /> Email</h3>
                                <p>abc@example.com</p>
                            </Col>
                            <Col span={8}>
                                <h3><PhoneOutlined /> Phone</h3>
                                <p>+9876543210</p>
                            </Col>
                            <Col span={8}>
                                <h3><EnvironmentOutlined /> Address</h3>
                                <p> Street, City, Country</p>
                            </Col>
                        </Row>
                    </div>
                    <div className="container py-5">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="form-wrapper bg-light mt-3 p-5">
                                    <Form layout="vertical" onFinish={handleCreateContactForm}>
                                        <h3>Contact Us Form</h3>
                                        <hr />
                                        {message && (
                                            <Alert
                                                message={message.content}
                                                type={message.type}
                                                showIcon
                                                className="mb-3"
                                            />
                                        )}
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
                                            <Input placeholder="Name" className="p-2" />
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
                                            <Input placeholder="abc@gmail.com" className="p-2" />
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
                                            <Input placeholder="1234567890" className="p-2" />
                                        </Form.Item>
                                        <Form.Item
                                            name={'message'}
                                            label="Message"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your message!',
                                                },
                                            ]}
                                            required={false}
                                        >
                                            <Input placeholder="Add message" className="p-2" />
                                        </Form.Item>

                                        <Button className="btn-primary w-100 p-3" type="submit" htmlType='submit'>Send Message</Button>
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
