import React, { useState } from 'react'
import { signupApi } from '../../services/api.service';
import { Button, Form, Input, Alert } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { setAccessToken, saveUserToLocalstorage } from '../../services/localstorage';

export default function Signup() {
    const [message, setMessage] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (values) => {
        signupApi({
            name: values.name,
            email: values.email,
            password: values.password,
            phone: values.phone
        })
            .then((response) => {
                console.log('Response:', response);
                const user = response;
                if (user) {
                    setAccessToken(user.token);
                    setUser(user);
                    saveUserToLocalstorage(user);
                    navigate('/');
                }
                setMessage({ type: 'success', content: 'Signup successful!' });
            }).catch((error) => {
                console.log('error', error)
                setMessage({ type: 'error', content: 'Email address is already registered with us.' });
            });
    };
    return (
        <div>
            <section className="bg-gray-50">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="form-wrapper auth-form bg-light mt-3 p-5">
                                <Form layout="vertical" onFinish={handleSubmit}>
                                    <h3>Create a new Account</h3>
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

                                    <Button className="btn-primary w-100 p-3" type="submit" htmlType='submit'>Create Account</Button>
                                </Form>
                                <p className="mt-4 account-link">
                                    Already have an account? <Link className="text-decoration-none" to="/auth/login">Login</Link>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
