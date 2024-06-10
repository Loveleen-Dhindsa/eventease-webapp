import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getSingleUser } from '../services/api.service';


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
        <div>
            {user ? (
                <div>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

};

export default UserProfile;