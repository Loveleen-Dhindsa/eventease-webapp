import axios from "./axios";


export const getEvents = async () => {
  return axios.get('/admin/events').then(({ data: response }) => {
    return response.data;
  });
};

export const getSingleUser = async (id) => {
  return axios.get(`/admin/${id}`).then(({ data: response }) => {
    return response.data;
  });
};
export const getUsers = async () => {
  return axios.get('/admin').then(({ data: response }) => {
    return response.data;
  });
};

// export const getUsers = async () => {
//   return axios.get('/admin/users').then(({ data: response }) => {
//     return response.data;
//   });
// };

// export const getSingleUser = async (id) => {
//   return axios.get(`/admin/users/${id}`).then(({ data: response }) => {
//     return response.data;
//   });
// };

export const getEventsById = async (id) => {
  return axios.get(`/admin/${id}/events`).then(({ data: response }) => {
    return response.data;
  });
};

export const createEvent = async (body) => {
  return axios.post('/admin/events', body).then(({ data: response }) => {
    return response.data;
  });
};

export const createUser = async (body) => {
  return axios.post('/admin', body).then(({ data: response }) => {
    return response.data;
  });
};

export const signupUser = async (body) => {
  return axios.post('/admin/signup', body).then(({ data: response }) => {
    return response.data;
  });
};

export const loginUser = async (body) => {
  return axios.post('/admin/login', body).then(({ data: response }) => {
    return response.data;
  });
};

export const deleteEvent = async (id) => {
  return axios.delete(`/admin/${id}/events`).then(({ data: response }) => {
    return response.data;
  });
};

export const updateEvent = async (id, body) => {
  return axios.put(`/admin/${id}/events`, body).then(({ data: response }) => {
    return response.data;
  });
};

export const getUpcomingEvents = async () => {
  return axios.get('/admin/events/upcoming/evn').then(({ data: response }) => {
    return response.data;
  });
};

// export const deleteSingleUser = async (id) => {
//   return axios.delete('/admin/users/' + id).then(({ data: response }) => {
//     return response.data;
//   });
// };

// export const updateUser = async (id, body) => {
//   return axios.put('/admin/users/' + id, body).then(({ data: response }) => {
//     return response.data;
//   });
// };

export const deleteSingleUser = async (id) => {
  return axios.delete('/admin/' + id).then(({ data: response }) => {
    return response.data;
  });
};

export const updateUser = async (id, body) => {
  return axios.put('/admin/' + id, body).then(({ data: response }) => {
    return response.data;
  });
};

export const getContacts = async () => {
  return axios.get('/admin/contacts').then(({ data: response }) => {
    return response.data;
  });
};

export const getFeedback = async () => {
  return axios.get('/admin/feedback').then(({ data: response }) => {
    return response.data;
  });
};

export const getSingleContact = async (id) => {
  return axios.get(`/admin/contacts/${id}`).then(({ data: response }) => {
    return response.data;
  });
};

export const getSingleFeedback = async (id) => {
  return axios.get(`/admin/feedback/${id}`).then(({ data: response }) => {
    return response.data;
  });
};

export const deleteSingleContact = async (id) => {
  return axios.delete('/admin/contacts/' + id).then(({ data: response }) => {
    return response.data;
  });
};

export const deleteSingleFeedback = async (id) => {
  return axios.delete('/admin/feedback/' + id).then(({ data: response }) => {
    return response.data;
  });
};