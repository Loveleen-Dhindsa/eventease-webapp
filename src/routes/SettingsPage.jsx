import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Alert, Select, Table, Popconfirm, Modal } from 'antd';
import { getAccessToken, getUserFromLocalstorage } from '../services/localstorage';
import { updateAccount } from '../services/api.service';


const SettingsPage = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [userLoaded, setUserLoaded] = useState(false);
    console.log('user--------', user)
    const [form] = Form.useForm();

    useEffect(() => {
        const token = getAccessToken();
        const userData = getUserFromLocalstorage();

        if (token && userData) {
            setUser(userData);
            form.setFieldsValue({
                name: userData.name,
                email: userData.email,
            });
        }
        setUserLoaded(true);
    }, [form]);

    console.log('accountUser------', user)

    const handleFormSubmit = (values) => {
        updateAccount(values).then(({ data }) => {
            console.log(data);
            setMessage({ type: 'success', content: 'Updated successful!' });
        }).catch((error) => {
            console.log('error', error)
            setMessage({ type: 'error', content: 'Invalid Data' });
        });
    };


    return (
        <div className="container">
            <h1 className="mt-5 mb-5 text-center">Manage Your Account</h1>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card text-center p-3">
                        <div className="card-header">Profile Settings</div>
                        <div className="card-body">
                            <Form layout="vertical"
                                form={form}
                                onFinish={handleFormSubmit}
                                initialValues={{
                                    name: user?.name,
                                    email: user?.email,
                                }}
                            >
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
                                    <Input placeholder="abc@gmail.com" className="p-2" disabled />
                                </Form.Item>
                                <Button className="btn-primary p-3" type="submit" htmlType='submit'>Update Account</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 text-center mb-5">
                <Link to="/" className="btn btn-secondary p-2">Back to Home</Link>
            </div>
        </div>
    );
};

export default SettingsPage;