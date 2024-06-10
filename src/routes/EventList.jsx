import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbTrash, TbEdit, TbPlus } from 'react-icons/tb';
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
    } else {
      setIsUpdateMode(false);
    }
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
    setCurrenteventId(null);
  };

  const handleCreateOrUpdateEvent = (values) => {

    if (isUpdateMode) {
      updateEvent(currenteventId, {
        eventName: values.eventName,
        eventDescription: values.eventDescription,
        eventDate: values.eventDate,
        eventLocation: values.eventLocation
      })
        .then(({ data: result }) => {
          console.log('Updated event:', result);
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
        eventLocation: values.eventLocation
      })
        .then(({ data: result }) => {
          console.log('Created event:', result);
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

                <Table
                  dataSource={events}
                  pagination={{
                    pageSize: 100,
                  }}
                >
                  <Table.Column
                    key={'eventName'}
                    title={'Event Name'}
                    dataIndex={'eventName'}
                    render={(text, record) => (
                      <Link to={`/events/${record._id}`}>{text}</Link>
                    )}
                  />
                  <Table.Column
                    key={'eventDate'}
                    title={'Event Date'}
                    dataIndex={'eventDate'}
                  />
                  <Table.Column
                    key={'eventLocation'}
                    title={'Event Location'}
                    dataIndex={'eventLocation'}
                  />
                  <Table.Column
                    key={'createdAt'}
                    title={'Date Created'}
                    dataIndex={'createdAt'}
                  />
                  <Table.Column
                    key="actions"
                    title="Actions"
                    render={(text, record) => (
                      <div>
                        <Popconfirm title="Are you sure you want to delete this event?" onConfirm={() => handleDeleteEvent(record._id)}>
                          <Button size='small'>
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
                        <Form layout="vertical" onFinish={handleCreateOrUpdateEvent}>
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

