import React from 'react'
import { Form, Input, Button, Row, Col } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export default function ContactUs() {
    return (
        <div className="contact-us-section">
            <div className="container py-5">
                <div className="row justify-content-center text-center">
                    <div className="col-md-12">
                        <h1>Contact Us</h1>
                        <p>If you have any questions, please feel free to reach out to us. We are here to help you!</p>
                    </div>
                    <div className="col-md-10 text-center mt-3">
                        <Row gutter={12}>
                            <Col span={8}>
                                <h3><MailOutlined /> Email</h3>
                                <p>support@example.com</p>
                            </Col>
                            <Col span={8}>
                                <h3><PhoneOutlined /> Phone</h3>
                                <p>+123 456 7890</p>
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
                                    <Form layout="vertical">
                                        <h3>Contact Us Form</h3>
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
                                            <Input placeholder="Tony Stark" autoComplete='off' />
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
                                            <Input placeholder="tony@starkindustries.com" autoComplete='off' />
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
                                            name={'address'}
                                            label="Address"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your address!',
                                                },
                                            ]}
                                            required={false}
                                        >
                                            <Input placeholder="New  Street" autoComplete='off' />
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
