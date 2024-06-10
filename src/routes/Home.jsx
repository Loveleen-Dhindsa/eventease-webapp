import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import EventList from './EventList';
import { getUpcomingEvents } from '../services/api.service';
import { Card, List, Typography, Col, Row } from 'antd';

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

    console.log('upcomingEvents----------', upcomingEvents)
    console.log('totalUpcomingEvents----------', totalUpcomingEvents)



    return (
        <div className="home-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="mx-auto text-center">
                            <h1 className="text-capitalize fw-bold">
                                Welcome to Event Management System
                            </h1>
                            <p className="lead source fw-light">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quas repellendus fugit dolorum consectetur repellat, excepturi laboriosam est necessitatibus accusamus tempora explicabo iure harum in veniam architecto rem ea, officiis porro beatae? Ad vel dicta est cumque esse provident natus, quaerat, dolor exercitationem molestiae ducimus laboriosam dolorem! Maxime perferendis dignissimos qui natus placeat sapiente fuga error, quis ipsum quam sint itaque minima aperiam quaerat tenetur voluptatibus perspiciatis officia ex officiis, sequi blanditiis, expedita temporibus. Ea tempore tenetur neque sit aspernatur, voluptatum molestias magnam id atque vel nemo officiis explicabo ipsam labore soluta ipsum expedita delectus rem quis sunt! Voluptate, consequatur.
                            </p>
                            <div className="space mt-5 text-center">
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

                            </div>
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