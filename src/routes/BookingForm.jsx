// // // import React, { useEffect, useState } from 'react';
// // // import { createBooking } from '../services/api.service';
// // // import { getAccessToken, getUserFromLocalstorage } from '../services/localstorage';

// // // const BookingForm = ({ eventId, onClose }) => {
// // //     const [userId, setUserId] = useState('');
// // //     const [message, setMessage] = useState(null);

// // //     useEffect(() => {
// // //         const token = getAccessToken();
// // //         const userData = getUserFromLocalstorage();

// // //         if (token && userData) {
// // //             setUserId(userData._id);
// // //         }
// // //     }, []);

// // //     const handleSubmit = async (event) => {
// // //         event.preventDefault();
// // //         try {
// // //             await createBooking({ userId, eventId });
// // //             setMessage({ type: 'success', content: 'Booking successful!' });
// // //             onClose(); // Close the form after successful booking
// // //         } catch (error) {
// // //             console.error('Error creating booking:', error);
// // //             setMessage({ type: 'error', content: 'Error occurred' });
// // //         }
// // //     };

// // //     return (
// // //         <div className="py-5">
// // //             <form onSubmit={handleSubmit}>
// // //                 <label>
// // //                     User ID:
// // //                     <input type="text" value={userId} readOnly />
// // //                 </label>
// // //                 <button type="submit">Submit</button>
// // //             </form>
// // //             {message && <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>{message.content}</div>}
// // //         </div>
// // //     );
// // // };

// // // export default BookingForm;

// // import React, { useState } from 'react';
// // import { createBooking } from '../services/api.service';

// // export default function BookingForm({ event, onClose,user }) {
// //     const [userId, setUserId] = useState(''); // Replace with actual user ID logic
// //     const [loading, setLoading] = useState(false);
// //     const [message, setMessage] = useState('');

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setLoading(true);
// //         try {
// //             const data = await createBooking({ userId: userId, eventId: event._id });

// //             if (data.success) {
// //                 setMessage({ type: 'success', content: 'Booking successful!' });
// //                 onClose(); // Close the form after successful booking
// //             } else {
// //                 setMessage({ type: 'error', content: 'Failed to create booking' });
// //             }
// //         } catch (error) {
// //             setMessage({ type: 'error', content: 'Error occurred' });
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <div className="modal-overlay">
// //             <div className="modal-content">
// //                 <span className="close-button" onClick={onClose}>&times;</span>
// //                 <h2>Book Event: {event?.eventName}</h2>
// //                 <form onSubmit={handleSubmit}>
// //                     <div className="form-group">
// //                         <label htmlFor="userId">User ID:</label>
// //                         <input
// //                             type="text"
// //                             id="userId"
// //                             value={userId}
// //                             onChange={(e) => setUserId(e.target.value)}
// //                             required
// //                         />
// //                     </div>
// //                     <button type="submit" disabled={loading}>
// //                         {loading ? 'Booking...' : 'Confirm Booking'}
// //                     </button>
// //                     {message && (
// //                         <div className={`message ${message.type}`}>
// //                             {message.content}
// //                         </div>
// //                     )}
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // }


// import React, { useEffect, useState } from 'react';
// import { createBooking } from '../services/api.service';
// import { getAccessToken, getUserFromLocalstorage } from '../services/localstorage';

// export default function BookingForm({ event, onClose }) {
//     const [userId, setUserId] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState('');

//     useEffect(() => {
//         const token = getAccessToken();
//         const userData = getUserFromLocalstorage();

//         if (token && userData) {
//             setUserId(userData._id);
//         }
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const data = await createBooking({ userId, eventId: event._id });

//             if (data.success) {
//                 setMessage({ type: 'success', content: 'Booking successful!' });
//                 onClose(); // Close the form after successful booking
//             } else {
//                 setMessage({ type: 'error', content: 'Failed to create booking' });
//             }
//         } catch (error) {
//             setMessage({ type: 'error', content: 'Error occurred' });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <span className="close-button" onClick={onClose}>&times;</span>
//                 <h2>Book Event: {event?.eventName}</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="form-group">
//                         <label htmlFor="userId">User ID:</label>
//                         <input
//                             type="text"
//                             id="userId"
//                             value={userId}
//                             readOnly
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="eventId">Event ID:</label>
//                         <input
//                             type="text"
//                             id="eventId"
//                             value={event._id}
//                             readOnly
//                             required
//                         />
//                     </div>
//                     <button type="submit" disabled={loading}>
//                         {loading ? 'Booking...' : 'Confirm Booking'}
//                     </button>
//                     {message && (
//                         <div className={`message ${message.type}`}>
//                             {message.content}
//                         </div>
//                     )}
//                 </form>
//             </div>
//         </div>
//     );
// }

import React, { useEffect, useState } from 'react';
import { createBooking } from '../services/api.service';
import { getAccessToken, getUserFromLocalstorage } from '../services/localstorage';

export default function BookingForm({ event, onClose }) {
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = getAccessToken();
        const userData = getUserFromLocalstorage();

        if (token && userData) {
            setUserId(userData._id);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await createBooking({ userId, eventId: event._id });
            console.log('data--------', data)
            setMessage({ type: 'success', content: 'Booking successful!' });
            onClose();
        } catch (error) {
            setMessage({ type: 'error', content: 'Event already booked by this user' });
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h2>Book Event: {event?.eventName}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userId">User ID:</label>
                        <input
                            type="text"
                            id="userId"
                            value={userId}
                            readOnly
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventId">Event ID:</label>
                        <input
                            type="text"
                            id="eventId"
                            value={event._id}
                            readOnly
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Booking...' : 'Confirm Booking'}
                    </button>
                    {message && (
                        <div className={`message ${message.type}`}>
                            {message.content}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}