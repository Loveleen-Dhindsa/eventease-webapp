import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUpcomingEvents } from '../services/api.service';
import LatestEvent from './LatestEvent';
import UpcomingEvent from './UpcomingEvent';

const Home = () => {

    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                const result = await getUpcomingEvents();
                console.log('result', result);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchUpcomingEvents();
    }, []);

    return (
        <div className="home-section">
            <div className="dashboard-header">
                <div className="dashboard mx-auto text-center">
                    <h1 className="text-capitalize fw-bold mb-3">
                        Welcome to Eventease
                    </h1>
                    <p className="dashboard-lead fw-light max-w-25">
                        At Eventease, we turn your event dreams into reality. Whether you’re planning a corporate gala, a wedding, a birthday bash, or any special occasion, we are here to make the process seamless and stress-free.
                    </p>
                    <button className="dashboard-button">
                        <Link to={"/about-us"} className="text-decoration-none dashboard-link">
                            About Us
                        </Link>
                    </button>

                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="mx-auto text-center">

                            <div className="row mb-5 text-center">
                                <LatestEvent />
                            </div>

                            <div className="row mt-5 mb-5 text-center">
                                <UpcomingEvent />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;