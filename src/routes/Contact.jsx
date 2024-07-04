// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { TbTrash } from 'react-icons/tb';
// import { Container, Table, Button } from "react-bootstrap";
// import { getContacts, deleteSingleContact } from '../services/api.service';

// export default function Contact() {
//     const [contacts, setContacts] = useState([]);
//     const [totalContacts, setTotalContacts] = useState(0);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchContacts();
//     }, []);

//     const fetchContacts = async () => {
//         try {
//             const result = await getContacts();
//             console.log('result', result);
//             setContacts(result);
//             setTotalContacts(result.length);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error', error);
//             setLoading(false);
//         }
//     };

//     const handleDeleteContact = (id) => {
//         deleteSingleContact(id)
//             .then(({ data: result }) => {
//                 console.log('Deleted contact:', result);
//                 fetchContacts();
//             })
//             .catch((error) => {
//                 console.log('Error deleting contact:', error);
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
//                                         <h3>Total List of Contacts: {totalContacts}</h3>
//                                     </div>
//                                 </div>

//                                 <Table striped bordered hover>
//                                     <thead>
//                                         <tr>
//                                             <th>Name</th>
//                                             <th>Email</th>
//                                             <th>Phone</th>
//                                             <th>Message</th>
//                                             <th>Date Created</th>
//                                             <th>Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {contacts.map((contact) => (
//                                             <tr key={contact._id}>
//                                                 <td><Link to={`/contacts/${contact._id}`}>{contact.name}</Link></td>
//                                                 <td>{contact.email}</td>
//                                                 <td>{contact.phone}</td>
//                                                 <td>{contact.message}</td>
//                                                 <td>{contact.createdAt}</td>
//                                                 <td>
//                                                     <Button variant="danger" size="sm" onClick={() => handleDeleteContact(contact._id)}>
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
// import { Container, Table, Button } from 'react-bootstrap';
// import { getContacts, deleteSingleContact } from '../services/api.service';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// export default function Contact() {
//     const [contacts, setContacts] = useState([]);
//     const [totalContacts, setTotalContacts] = useState(0);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchContacts();
//     }, []);

//     const fetchContacts = async () => {
//         try {
//             const result = await getContacts();
//             console.log('result', result);
//             setContacts(result);
//             setTotalContacts(result.length);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error', error);
//             setLoading(false);
//         }
//     };

//     const handleDeleteContact = (id) => {
//         deleteSingleContact(id)
//             .then(({ data: result }) => {
//                 console.log('Deleted contact:', result);
//                 fetchContacts();
//             })
//             .catch((error) => {
//                 console.log('Error deleting contact:', error);
//             });
//     };

//     const downloadPDF = () => {
//         const input = document.getElementById('contacts-table');
//         html2canvas(input)
//             .then((canvas) => {
//                 const imgData = canvas.toDataURL('image/png');
//                 const pdf = new jsPDF();
//                 pdf.addImage(imgData, 'PNG', 10, 10);
//                 pdf.save('contacts.pdf');
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
//                                         <h3>Total List of Contacts: {totalContacts}</h3>
//                                     </div>
//                                     <div className="col-md-4 text-right">
//                                         <Button variant="primary" onClick={downloadPDF}>
//                                             Download PDF
//                                         </Button>
//                                     </div>
//                                 </div>

//                                 <Table striped bordered hover id="contacts-table">
//                                     <thead>
//                                         <tr>
//                                             <th>Name</th>
//                                             <th>Email</th>
//                                             <th>Phone</th>
//                                             <th>Message</th>
//                                             <th>Date Created</th>
//                                             <th>Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {contacts.map((contact) => (
//                                             <tr key={contact._id}>
//                                                 <td><Link to={`/contacts/${contact._id}`}>{contact.name}</Link></td>
//                                                 <td>{contact.email}</td>
//                                                 <td>{contact.phone}</td>
//                                                 <td>{contact.message}</td>
//                                                 <td>{contact.createdAt}</td>
//                                                 <td>
//                                                     <Button variant="danger" size="sm" onClick={() => handleDeleteContact(contact._id)}>
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
import { Container, Table, Button } from 'react-bootstrap';
import { getContacts, deleteSingleContact } from '../services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Contact() {
    const [contacts, setContacts] = useState([]);
    const [totalContacts, setTotalContacts] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const result = await getContacts();
            console.log('result', result);
            setContacts(result);
            setTotalContacts(result.length);
            setLoading(false);
        } catch (error) {
            console.error('Error', error);
            setLoading(false);
        }
    };

    const handleDeleteContact = (id) => {
        deleteSingleContact(id)
            .then(({ data: result }) => {
                console.log('Deleted contact:', result);
                fetchContacts();
            })
            .catch((error) => {
                console.log('Error deleting contact:', error);
            });
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const columns = ["Name", "Email", "Phone", "Message", "Date Created"];
        const rows = contacts.map(contact => [
            contact.name,
            contact.email,
            contact.phone,
            contact.message,
            contact.createdAt
        ]);
        doc.autoTable({
            head: [columns],
            body: rows,
        });
        doc.save('contacts.pdf');
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
                                        <h3>Total List of Contacts: {totalContacts}</h3>
                                    </div>
                                    <div className="col-md-4 text-right">
                                        <Button variant="success" onClick={downloadPDF}>
                                            Download PDF
                                        </Button>
                                    </div>
                                </div>

                                <Table striped bordered hover id="contacts-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Message</th>
                                            <th>Date Created</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contacts.map((contact) => (
                                            <tr key={contact._id}>
                                                <td><Link to={`/contacts/${contact._id}`}>{contact.name}</Link></td>
                                                <td>{contact.email}</td>
                                                <td>{contact.phone}</td>
                                                <td>{contact.message}</td>
                                                <td>{contact.createdAt}</td>
                                                <td>
                                                    <Button variant="danger" size="sm" onClick={() => handleDeleteContact(contact._id)}>
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