import React, { useEffect, useState } from 'react';
import SingleBooking from '../SingleBooking/SingleBooking';
import './ManageAll.css'

const ManageAll = () => {

    const [bookings, setBookings] = useState([]);
    const [status, setStatus] = useState(true);

    useEffect(() => {
        fetch('https://sheltered-beach-92728.herokuapp.com/booking')
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setStatus(true);
            });
    }, [status]);


    const handleApprove = (id, index) => {
        const warning = window.confirm('Approve This Booking..!?');
        
        if (warning) {
            fetch(`https://sheltered-beach-92728.herokuapp.com/booking/status/${id}`, { method: 'PUT' })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        alert('Booking Approved...!!!');
                        setStatus(false);
                    }
                });
        }
    }

    const handleDelete = (id) => {
        const warning = window.confirm('Are you sure\nYou want to delete this booking..!?');

        if (warning) {
            fetch(`https://sheltered-beach-92728.herokuapp.com/booking/${id}`, { method: 'DELETE' })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remaining = bookings.filter(booking => booking._id !== id);
                        setBookings(remaining);
                    }
                });
        }
    }


    return (
        <div className="page text-center">
            {
                bookings[0] ? <h2 className="fw-bold mt-3">Manage All <span className="text-warning">Bookings </span>: {bookings.length}</h2> : <h2 className="fw-bold mt-3">No <span className="text-warning">Bookings</span> Yet</h2>
            }

            {
                bookings.map((agent, index) => (
                    <SingleBooking key={agent._id} agent={agent.agent}>
                        <div>
                            <div className="author-section mt-2 mt-lg-4 text-secondary">
                                <p>Author &nbsp;: &nbsp;&nbsp;<span>{agent.author}</span></p>
                                <p>Status &nbsp;&nbsp;: &nbsp;&nbsp;
                                {
                                    agent.status === 'Pending' ? 
                                        <span className="pending">{agent.status} &nbsp;<i className="fas fa-hourglass-half"></i></span> :
                                        <span className="approved">{agent.status} &nbsp;<i className="fas fa-check"></i></span>
                                }
                                </p>
                            </div>
                            <div className="manage-section d-flex justify-content-between flex-column flex-lg-row mt-2 mt-lg-4">
                                <button onClick={() => handleApprove(agent._id, index)} className="btn btn-approve me-lg-5 px-lg-3" disabled={agent.status !== 'Pending'}><i className="fas fa-check"></i> &nbsp;{agent.status !== 'Pending' ? 'Booking Approved' : 'Approve Booking'}</button>
                                
                                {/* <button className="btn btn-update me-lg-5"><i className="far fa-edit"></i> &nbsp;Update Booking</button> */}
                                
                                <button onClick={() => handleDelete(agent._id)} className="btn btn-delete px-lg-3"><i className="far fa-trash-alt"></i> &nbsp;Delete Booking</button>
                            </div>
                        </div>
                    </SingleBooking>
                ))
            }
        </div>
    );
};

export default ManageAll;