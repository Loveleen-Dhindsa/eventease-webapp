import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbTrash, TbEdit, TbPlus, TbSearch } from 'react-icons/tb';
import { Container } from "react-bootstrap"
import { createEvent, deleteEvent, updateEvent, getEvents } from '../services/api.service'
import { Form, Button, Input, Select, Table, Popconfirm, Modal } from 'antd';
const { Option } = Select;


export default function EventList() {
  const [message, setMessage] = useState(null);
  const [events, setEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState([])
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currenteventId, setCurrenteventId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [form] = Form.useForm();


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

  const showModal = (event) => {
    if (event) {
      setIsUpdateMode(true);
      setCurrenteventId(event._id);
      form.setFieldsValue(event);
    } else {
      setIsUpdateMode(false);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
    setCurrenteventId(null);
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

  const handleCreateOrUpdateEvent = (values) => {

    if (isUpdateMode) {
      updateEvent(currenteventId, {
        eventName: values.eventName,
        eventDescription: values.eventDescription,
        eventDate: values.eventDate,
        eventLocation: values.eventLocation,
        category: values.category
      })
        .then((res) => {
          console.log('res', res)
          fetchEvents();
          hideModal();
        })
        .catch((error) => {
          console.log('Error updating event:', error);
        });
    } else {
      createEvent({
        eventName: values.eventName,
        eventDescription: values.eventDescription,
        eventDate: values.eventDate,
        eventLocation: values.eventLocation,
        category: values.category
      })
        .then((res) => {
          console.log('Created event:', res);
          fetchEvents();
          hideModal();
        }).catch((error) => {
          console.log('error', error)
          setMessage({ type: 'error', content: 'Error Occured' });
        });
    }


  };

  const handleDeleteEvent = (id) => {
    deleteEvent(id)
      .then(({ data: result }) => {
        const event = result;
        console.log('Deleted event:', event);
        fetchEvents();
      })
      .catch((error) => {
        console.log('Error deleting event:', error);
      })
  };

  return (
    <Container>
      <div className="dashboard-page-header p-3">
        <div className="row">
          <div className="col-md-12">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <div className="row mb-3">
                  <div className="col-md-8">
                    <h3>Total List of Events: {totalEvents}</h3>
                  </div>

                  <div className="col-md-4 text-end">
                    <div className="dashboard-actions">
                      <Button className="text-end" type="primary" onClick={() => showModal(null)}>
                        <TbPlus />New Events
                      </Button>
                    </div>
                  </div>
                </div>
                <div class="row justify-content-center mb-5">
                  <div className="col-md-6 mt-3">
                    <div className="input-group">
                      <span className="input-group-text"><TbSearch size={25} /></span>
                      <input type="text" className="form-control" placeholder="Search Category....." onChange={handleSearchChange} />
                    </div>
                  </div>
                </div>

                <Table
                  dataSource={getFilteredEvents()}
                  rowKey="id"
                  pagination={{
                    pageSize: 100,
                  }}
                >
                  <Table.Column
                    key="eventName"
                    title="Event Name"
                    dataIndex="eventName"
                    render={(text, record) => (
                      <Link to={`/events/${record._id}`}>{text}</Link>
                    )}
                  />
                  <Table.Column
                    key="eventDate"
                    title="Event Date"
                    dataIndex="eventDate"
                  />
                  <Table.Column
                    key="eventLocation"
                    title="Event Location"
                    dataIndex="eventLocation"
                  />
                  <Table.Column
                    key="category"
                    title="Category"
                    dataIndex="category"
                  />
                  <Table.Column
                    key="createdAt"
                    title="Date Created"
                    dataIndex="createdAt"
                  />
                  <Table.Column
                    key="actions"
                    title="Actions"
                    render={(text, record) => (
                      <div>
                        <Popconfirm title="Are you sure you want to delete this event?" onConfirm={() => handleDeleteEvent(record._id)}>
                          <Button size="small">
                            <TbTrash />
                          </Button>
                        </Popconfirm>
                        <Button icon={<TbEdit />} onClick={() => showModal(record)} />
                      </div>
                    )}
                  />
                </Table>
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <div className="form-wrapper auth-form">
                      <Modal className="text-center fs-2"
                        title={isUpdateMode ? "Update Event" : "Create Event"}
                        open={isModalVisible}
                        onCancel={hideModal}
                        footer={false}
                        destroyOnClose={true}
                      >
                        <Form form={form} layout="vertical" onFinish={handleCreateOrUpdateEvent}>
                          <Form.Item label="Event Name" name="eventName" rules={[{ required: true, message: 'Please input the event name!' }]}>
                            <Input />
                          </Form.Item>
                          <Form.Item label="Event Date" name="eventDate" rules={[{ required: true, message: 'Please input the event date!' }]}>
                            <Input type="date" />
                          </Form.Item>
                          <Form.Item label="Event Description" name="eventDescription">
                            <Input.TextArea rows={4} />
                          </Form.Item>
                          <Form.Item label="Event Loaction" name="eventLocation" rules={[{ required: true, message: 'Please input the event location!' }]}>
                            <Input />
                          </Form.Item>
                          <Form.Item
                            name={'category'}
                            label="Category"
                            rules={[
                              {
                                required: false,
                                message: 'Please select your category!',
                              },
                            ]}
                          >
                            <Select placeholder="Select a category">
                              <Option value="music">Music</Option>
                              <Option value="sports">Sports</Option>
                              <Option value="arts">Arts</Option>
                              <Option value="education">Education</Option>
                              <Option value="business">Business</Option>
                            </Select>
                          </Form.Item>
                          <Button className="btn-primary w-100 p-3" type="submit" htmlType='submit'>Create Event</Button>
                        </Form>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}

// const eventsData = [
//   { id: 1, name: 'Music Concert', category: 'Music' },
//   { id: 2, name: 'Football Match', category: 'Sports' },
//   { id: 3, name: 'Art Exhibition', category: 'Art' },
//   { id: 4, name: 'Basketball Game', category: 'Sports' },
//   { id: 5, name: 'Classical Music', category: 'Music' },
// ];

// const UserProfile = () => {
//   const [events, setEvents] = useState(eventsData);
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearchChange = (e) => {
//       setSearchQuery(e.target.value);
//   };

//   const getFilteredEvents = () => {
//       return events.filter(event =>
//           event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           event.category.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//   };

//   return (
//       <div>
//           <h1>Event Management</h1>
//           <div>
//               <input
//                   type="text"
//                   placeholder="Search events..."
//                   value={searchQuery}
//                   onChange={handleSearchChange}
//               />
//           </div>
//           <div>
//               <h2>Events:</h2>
//               <ul>
//                   {getFilteredEvents().map(event => (
//                       <li key={event.id}>{event.name} - {event.category}</li>
//                   ))}
//               </ul>
//           </div>
//       </div>
//   );
// };


