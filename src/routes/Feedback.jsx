// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { TbTrash } from 'react-icons/tb';
// import { Container, Table, Button } from "react-bootstrap";
// import { getFeedback, deleteSingleFeedback } from '../services/api.service';

// export default function Feedback() {
//     const [feedback, setFeedback] = useState([]);
//     const [totalFeedback, setTotalFeedback] = useState(0);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchFeedback();
//     }, []);

//     const fetchFeedback = async () => {
//         try {
//             const result = await getFeedback();
//             console.log('result', result);
//             setFeedback(result);
//             setTotalFeedback(result.length);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error', error);
//             setLoading(false);
//         }
//     };

//     const handleDeleteFeedback = (id) => {
//         deleteSingleFeedback(id)
//             .then(({ data: result }) => {
//                 console.log('Deleted Feedback:', result);
//                 fetchFeedback();
//             })
//             .catch((error) => {
//                 console.log('Error deleting Feedback:', error);
//             })
//     };

//     return (
//         <Container>
//             <div className="dashboard-page-header p-3">
//                 <div className="row">
//                     <div className="col-md-12">
//                         {loading ? (
//                             <p>Loading...</p>
//                         ) : (
//                             <div>
//                                 <div className="row mb-3">
//                                     <div className="col-md-8">
//                                         <h3>Total List of Feedbacks: {totalFeedback}</h3>
//                                     </div>
//                                 </div>

//                                 <Table striped bordered hover>
//                                     <thead>
//                                         <tr>
//                                             <th>Name</th>
//                                             <th>Email</th>
//                                             <th>Message</th>
//                                             <th>Feedback Type</th>
//                                             <th>Date Created</th>
//                                             <th>Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {feedback.map((item) => (
//                                             <tr key={item._id}>
//                                                 <td><Link to={`/feedback/${item._id}`}>{item.name}</Link></td>
//                                                 <td>{item.email}</td>
//                                                 <td>{item.message}</td>
//                                                 <td>{item.feedbackType}</td>
//                                                 <td>{item.createdAt}</td>
//                                                 <td>
//                                                     <Button variant="danger" size="sm" onClick={() => handleDeleteFeedback(item._id)}>
//                                                         <TbTrash />
//                                                     </Button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </Table>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </Container>
//     );
// }

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { TbTrash } from 'react-icons/tb';
// import { Container, Table, Button } from "react-bootstrap";
// import { getFeedback, deleteSingleFeedback } from '../services/api.service';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// export default function Feedback() {
//     const [feedback, setFeedback] = useState([]);
//     const [totalFeedback, setTotalFeedback] = useState(0);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchFeedback();
//     }, []);

//     const fetchFeedback = async () => {
//         try {
//             const result = await getFeedback();
//             console.log('result', result);
//             setFeedback(result);
//             setTotalFeedback(result.length);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error', error);
//             setLoading(false);
//         }
//     };

//     const handleDeleteFeedback = (id) => {
//         deleteSingleFeedback(id)
//             .then(({ data: result }) => {
//                 console.log('Deleted Feedback:', result);
//                 fetchFeedback();
//             })
//             .catch((error) => {
//                 console.log('Error deleting Feedback:', error);
//             });
//     };

//     const downloadPDF = () => {
//         const input = document.getElementById('feedback-table');
//         html2canvas(input)
//             .then((canvas) => {
//                 const imgData = canvas.toDataURL('image/png');
//                 const pdf = new jsPDF();
//                 pdf.addImage(imgData, 'PNG', 10, 10);
//                 pdf.save('feedback.pdf');
//             })
//             .catch((error) => {
//                 console.error('Error generating PDF', error);
//             });
//     };

//     return (
//         <Container>
//             <div className="dashboard-page-header p-3">
//                 <div className="row">
//                     <div className="col-md-12">
//                         {loading ? (
//                             <p>Loading...</p>
//                         ) : (
//                             <div>
//                                 <div className="row mb-3">
//                                     <div className="col-md-8">
//                                         <h3>Total List of Feedbacks: {totalFeedback}</h3>
//                                     </div>
//                                     <div className="col-md-4 text-right">
//                                         <Button variant="primary" onClick={downloadPDF}>
//                                             Download PDF
//                                         </Button>
//                                     </div>
//                                 </div>

//                                 <Table striped bordered hover id="feedback-table">
//                                     <thead>
//                                         <tr>
//                                             <th>Name</th>
//                                             <th>Email</th>
//                                             <th>Message</th>
//                                             <th>Feedback Type</th>
//                                             <th>Date Created</th>
//                                             <th>Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {feedback.map((item) => (
//                                             <tr key={item._id}>
//                                                 <td><Link to={`/feedback/${item._id}`}>{item.name}</Link></td>
//                                                 <td>{item.email}</td>
//                                                 <td>{item.message}</td>
//                                                 <td>{item.feedbackType}</td>
//                                                 <td>{item.createdAt}</td>
//                                                 <td>
//                                                     <Button variant="danger" size="sm" onClick={() => handleDeleteFeedback(item._id)}>
//                                                         <TbTrash />
//                                                     </Button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </Table>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </Container>
//     );
// }

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TbTrash } from 'react-icons/tb';
import { Container, Table, Button } from "react-bootstrap";
import { getFeedback, deleteSingleFeedback } from '../services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Feedback() {
    const [feedback, setFeedback] = useState([]);
    const [totalFeedback, setTotalFeedback] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const result = await getFeedback();
            console.log('result', result);
            setFeedback(result);
            setTotalFeedback(result.length);
            setLoading(false);
        } catch (error) {
            console.error('Error', error);
            setLoading(false);
        }
    };

    const handleDeleteFeedback = (id) => {
        deleteSingleFeedback(id)
            .then(({ data: result }) => {
                console.log('Deleted Feedback:', result);
                fetchFeedback();
            })
            .catch((error) => {
                console.log('Error deleting Feedback:', error);
            });
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const columns = ["Name", "Email", "Message", "Feedback Type", "Date Created"];
        const rows = feedback.map(item => [
            item.name,
            item.email,
            item.message,
            item.feedbackType,
            item.createdAt
        ]);
        doc.autoTable({
            head: [columns],
            body: rows,
        });

        doc.save('feedback.pdf');
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
                                        <h3>Total List of Feedbacks: {totalFeedback}</h3>
                                    </div>
                                    <div className="col-md-4 text-right">
                                        <Button variant="success" onClick={downloadPDF}>
                                            Download PDF
                                        </Button>
                                    </div>
                                </div>

                                <Table striped bordered hover id="feedback-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Message</th>
                                            <th>Feedback Type</th>
                                            <th>Date Created</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {feedback.map((item) => (
                                            <tr key={item._id}>
                                                <td><Link to={`/feedback/${item._id}`}>{item.name}</Link></td>
                                                <td>{item.email}</td>
                                                <td>{item.message}</td>
                                                <td>{item.feedbackType}</td>
                                                <td>{item.createdAt}</td>
                                                <td>
                                                    <Button variant="danger" size="sm" onClick={() => handleDeleteFeedback(item._id)}>
                                                        <TbTrash />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
}