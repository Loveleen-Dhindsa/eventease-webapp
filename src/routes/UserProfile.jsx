import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getSingleUser } from '../services/api.service';
import { Card, Col, Descriptions, Row, Statistic, Button } from 'antd';

const UserProfile = () => {
    const params = useParams();
    const userId = params.userId;
    console.log('id-----------', userId);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log('user-----------', user);


    useEffect(() => {
        const fetchSingleEvent = async () => {
            try {
                const result = await getSingleUser(userId);
                console.log('Fetched Single User:', result);
                setUser(result);
                setLoading(false);
            } catch (error) {
                console.error('Error setting events:', error);
                setLoading(false);
            }
        };

        fetchSingleEvent();
    }, [userId]);


    return (

        <div className="p-5">
            <Card title="User info">
                <Descriptions>
                    <Descriptions.Item label="Name">{user?.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
                    <Descriptions.Item label="Created At">
                        {user?.createdAt}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );

};

export default UserProfile;