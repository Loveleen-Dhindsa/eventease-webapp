import React from 'react'
import { loginApi } from '../../services/api.service';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { setAccessToken } from '../../services/localstorage';


export default function Login() {

    const handleSubmit = (values) => {
        loginApi({
            email: values.email,
            password: values.password,
        })
            .then(({ data }) => {
                setAccessToken(data.token);
            }).catch((error) => {
                console.log('error', error)
            });
    };
    return (
        <div>
            <section className="bg-gray-50">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="form-wrapper auth-form bg-light mt-5 p-5">
                                <Form layout="vertical" onFinish={handleSubmit}>
                                    <h3>Create a new Account</h3>
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
                                            {
                                                required: true,
                                                message: 'Please input your email!',
                                            },
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
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input.Password placeholder="*******" type="password" />
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
