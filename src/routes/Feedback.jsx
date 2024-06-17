import React, { useState } from 'react'
import { Form, Input, Button, Row, Col, Select, Alert } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { createFeedback } from '../services/api.service';
const { TextArea } = Input;
const { Option } = Select;


export default function Feedback() {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);

    const handleCreateFeedbackForm = (values) => {
        createFeedback({
            name: values.name,
            email: values.email,
            feedbackType: values.feedbackType,
            message: values.message
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
            <div className="container py-5">
                <div className="row justify-content-center text-center">
                    <div className="col-md-8">
                        <div className="form-wrapper bg-lightp-5">
                            <Form layout="vertical" onFinish={handleCreateFeedbackForm}>
                                <h3>Feedback Form</h3>
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
                                    <Input placeholder="Type Message" className="p-2" />
                                </Form.Item>
                                <Form.Item
                                    name={'feedbackType'}
                                    label="Feedback Type"
                                    defaultValue="positive"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please select your feedback type!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Select a Feedback Type">
                                        <Option value="positive">Positive</Option>
                                        <Option value="negative">Negative</Option>
                                        <Option value="neutral">Neutral</Option>
                                    </Select>
                                </Form.Item>

                                <Button className="btn-primary w-100 p-3" type="submit" htmlType='submit'>Send Message</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
