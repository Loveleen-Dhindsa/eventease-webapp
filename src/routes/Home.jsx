import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import "./Home.css";
import EventList from './EventList';
import { getUpcomingEvents } from '../services/api.service';
import { Card, List, Typography, Col, Row } from 'antd';
import LatestEvent from './LatestEvent';
import UpcomingEvent from './UpcomingEvent';

const Home = () => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [totalUpcomingEvents, setTotalUpcomingEvents] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUpcomingEvents = async () => {
            try {
                const result = await getUpcomingEvents();
                console.log('result', result);
                setUpcomingEvents(result);
                setTotalUpcomingEvents(result.length);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };
        fetchUpcomingEvents();
    }, []);

    return (
        <div className="home-section">
            <div className="dashboard-header">
                <img
                    src="/images/event-page.png"
                    alt="Event Management System"
                    className="dashboard-image w-100 vh-20"
                />
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="mx-auto text-center">
                            <h1 className="text-capitalize fw-bold mb-3">
                                Welcome to Event Management System
                            </h1>
                            <p className="lead source fw-light">
                                Welcome to the ultimate platform for managing and attending events effortlessly. Whether you're an organizer planning a grand conference or a participant looking for exciting events to attend, our Event Management System has everything you need.
                            </p>

                            <div className="row mt-5 mb-5 text-center">
                                <LatestEvent />
                            </div>

                            <div className="row mt-5 mb-5 text-center">
                                <UpcomingEvent />
                            </div>
                            {/* <div className="space mt-5 text-center mb-5">
                                <div className="upcoming-events-container">
                                    <h2 className="mb-5">Upcoming Events</h2>
                                    <Row gutter={16}>
                                        {upcomingEvents.map((event) => (
                                            <Col span={8}>
                                                <Card>

                                                    <h5 className="card-title">{event.eventName}</h5>
                                                    <p className="card-text">{event.eventDescription}</p>
                                                    <p className="card-text">{event.eventLocation}</p>
                                                    <p className="card-text">Date: {event.eventDate}</p>

                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>

                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <h1 className="text-center mt-5">Welcome to Event Management System</h1>
            <p className="">Manage and attend events seamlessly.</p>
            <Link to="/event-lists">View Events</Link> */}
        </div>
    );
};

export default Home;