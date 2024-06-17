import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbSearch } from 'react-icons/tb';
import { Container } from "react-bootstrap"
import { createEvent, deleteEvent, updateEvent, getEvents } from '../services/api.service'
import { Button, Form, Input, Select, Table, Popconfirm, Modal } from 'antd';

export default function EventList() {
  const [message, setMessage] = useState(null);
  const [events, setEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState([])
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currenteventId, setCurrenteventId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const result = await getEvents();
      console.log('result', result);
      setEvents(result);
      setTotalEvents(result.length);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const getImagePath = (category) => {
    // Map event category to corresponding local image file
    const categoryImages = {
      'birthday': '/images/birthday.jpg',
      'music': '/images/music.jpg',
      'sports': '/images/sports.jpg',
    };

    return categoryImages[category] || '/images/default.jpg';
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const getFilteredEvents = () => {
    if (!searchQuery) {
      return events;
    }
    return events.filter(event =>
      event.category && event.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };


  const filteredEvents = getFilteredEvents();

  // const showModal = (event) => {
  //   if (event) {
  //     setIsUpdateMode(true);
  //     setCurrenteventId(event._id);
  //   } else {
  //     setIsUpdateMode(false);
  //   }
  //   setIsModalVisible(true);
  // };

  // const hideModal = () => {
  //   setIsModalVisible(false);
  //   setCurrenteventId(null);
  // };

  // const handleCreateOrUpdateEvent = (values) => {

  //   if (isUpdateMode) {
  //     updateEvent(currenteventId, {
  //       eventName: values.eventName,
  //       eventDescription: values.eventDescription,
  //       eventDate: values.eventDate,
  //       eventLocation: values.eventLocation
  //     })
  //       .then(({ data: result }) => {
  //         console.log('Updated event:', result);
  //         fetchEvents();
  //         hideModal();
  //       })
  //       .catch((error) => {
  //         console.log('Error updating event:', error);
  //       });
  //   } else {
  //     createEvent({
  //       eventName: values.eventName,
  //       eventDescription: values.eventDescription,
  //       eventDate: values.eventDate,
  //       eventLocation: values.eventLocation
  //     })
  //       .then(({ data: result }) => {
  //         console.log('Created event:', result);
  //         fetchEvents();
  //         hideModal();
  //       }).catch((error) => {
  //         console.log('error', error)
  //         setMessage({ type: 'error', content: 'Error Occured' });
  //       });
  //   }


  // };

  // const handleDeleteEvent = (id) => {
  //   deleteEvent(id)
  //     .then(({ data: result }) => {
  //       const event = result;
  //       console.log('Deleted event:', event);
  //       fetchEvents();
  //     })
  //     .catch((error) => {
  //       console.log('Error deleting event:', error);
  //     })
  // };

  return (
    // <Container>
    //   <div className="dashboard-page-header p-3">
    //     <div className="row">
    //       <div className="col-md-12">
    //         {loading ? (
    //           <p>Loading...</p>
    //         ) : (
    //           <div>
    //             <div className="row mb-3">
    //               <div className="col-md-8">
    //                 <h3>Total List of Events: {totalEvents}</h3>
    //               </div>

    //               <div className="col-md-4 text-end">
    //                 <div className="dashboard-actions">
    //                   <Button className="text-end" type="primary" onClick={() => showModal(null)}>
    //                     <TbPlus />New Events
    //                   </Button>
    //                 </div>
    //               </div>
    //             </div>

    //             <Table
    //               dataSource={events}
    //               pagination={{
    //                 pageSize: 100,
    //               }}
    //             >
    //               <Table.Column
    //                 key={'eventName'}
    //                 title={'Event Name'}
    //                 dataIndex={'eventName'}
    //                 render={(text, record) => (
    //                   <Link to={`/events/${record._id}`}>{text}</Link>
    //                 )}
    //               />
    //               <Table.Column
    //                 key={'eventDate'}
    //                 title={'Event Date'}
    //                 dataIndex={'eventDate'}
    //               />
    //               <Table.Column
    //                 key={'eventLocation'}
    //                 title={'Event Location'}
    //                 dataIndex={'eventLocation'}
    //               />
    //               <Table.Column
    //                 key={'createdAt'}
    //                 title={'Date Created'}
    //                 dataIndex={'createdAt'}
    //               />
    //               <Table.Column
    //                 key="actions"
    //                 title="Actions"
    //                 render={(text, record) => (
    //                   <div>
    //                     <Popconfirm title="Are you sure you want to delete this event?" onConfirm={() => handleDeleteEvent(record._id)}>
    //                       <Button size='small'>
    //                         <TbTrash />
    //                       </Button>
    //                     </Popconfirm>
    //                     <Button icon={<TbEdit />} onClick={() => showModal(record)} />
    //                   </div>
    //                 )}
    //               />
    //             </Table>
    //             <div className="row justify-content-center">
    //               <div className="col-md-10">
    //                 <div className="form-wrapper auth-form">
    //                   <Modal className="text-center fs-2"
    //                     title={isUpdateMode ? "Update Event" : "Create Event"}
    //                     open={isModalVisible}
    //                     onCancel={hideModal}
    //                     footer={false}
    //                     destroyOnClose={true}
    //                   >
    //                     <Form layout="vertical" onFinish={handleCreateOrUpdateEvent}>
    //                       <Form.Item label="Event Name" name="eventName" rules={[{ required: true, message: 'Please input the event name!' }]}>
    //                         <Input />
    //                       </Form.Item>
    //                       <Form.Item label="Event Date" name="eventDate" rules={[{ required: true, message: 'Please input the event date!' }]}>
    //                         <Input type="date" />
    //                       </Form.Item>
    //                       <Form.Item label="Event Description" name="eventDescription">
    //                         <Input.TextArea rows={4} />
    //                       </Form.Item>
    //                       <Form.Item label="Event Loaction" name="eventLocation" rules={[{ required: true, message: 'Please input the event location!' }]}>
    //                         <Input />
    //                       </Form.Item>
    //                       <Button className="btn-primary w-100 p-3" type="submit" htmlType='submit'>Create Event</Button>
    //                     </Form>
    //                   </Modal>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </Container>
    <div className="container mt-5">
      <div class="row justify-content-center mb-5">
        <div className="col-md-6 mt-3">
          <div className="input-group">
            <span className="input-group-text"><TbSearch size={25} /></span>
            <input type="text" className="form-control" placeholder="Search Category....." onChange={handleSearchChange} />
          </div>
        </div>
      </div>
      <div className="row mb-5">
        {filteredEvents.map((event) => (
          <div className="col-md-4 mb-5" key={event._id}>
            <Link to={`/events/${event._id}`} className="card-link text-decoration-none">
              <div className="card mx-auto">
                <img
                  src={getImagePath(event.category)}
                  className="card-img-top img-fluid"
                  alt={event.category}
                />
                <div className="card-body">
                  <h5 className="card-title no-decoration">{event.eventName}</h5>
                  <p className="card-text no-decoration">{event.eventDescription}</p>
                  <p className="card-text no-decoration">{event.category}</p>

                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

