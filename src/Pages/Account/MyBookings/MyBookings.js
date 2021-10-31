import React, { useEffect, useState } from 'react';
import './MyBookings.css';
import useAuth from '../../../hooks/useAuth';
import SingleBooking from '../SingleBooking/SingleBooking';

const MyBookings = () => {

    const { user } = useAuth();
    const [myBookings, setMyBookings] = useState([]);

    useEffect(() => {
        const author = { author: user.email };
        fetch('https://sheltered-beach-92728.herokuapp.com/myBookings', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(author)
        })
            .then(res => res.json())
            .then(data => {
                if (data[0]) {
                    // const allBookings = data.map(x => (x.agent._id = x._id) && x.agent);
                    setMyBookings(data);
                }
                else {
                    alert('You didn\'t book anything yet...!!!');
                }
            });
    }, [user.email]);

    const handleDelete = (id) => {
        const warning = window.confirm('Are you sure\nYou want to delete this booking..!?');

        if (warning) {
            fetch(`https://sheltered-beach-92728.herokuapp.com/booking/${id}`, { method: 'DELETE' })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remaining = myBookings.filter(booking => booking._id !== id);
                        setMyBookings(remaining);
                    }
                });
        }
    }

    return (
        <div className="page text-center">
            {
                myBookings[0] ? <h2 className="fw-bold mt-3">My <span className="text-warning">Bookings</span> : {myBookings.length}</h2> : <h2 className="fw-bold mt-3">No <span className="text-warning">Bookings</span> Yet</h2>
            }

            {
                myBookings.map(booking => (
                    <SingleBooking key={booking._id} agent={booking.agent}>
                        <div className="my-booking-manage d-flex justify-content-between align-items-center py-3">
                            <p>Status &nbsp;&nbsp;: &nbsp;&nbsp;
                                {
                                    booking.status === 'Pending' ?
                                        <span className="pending">{booking.status} &nbsp;<i className="fas fa-hourglass-half"></i></span> :
                                        <span className="approved">{booking.status} &nbsp;<i className="fas fa-check"></i></span>
                                }
                            </p>
                            <button onClick={() => handleDelete(booking._id)} className="btn btn-delete px-lg-3"><i className="far fa-trash-alt"></i> &nbsp;Cancel Booking</button>
                        </div>
                    </SingleBooking>
                ))
            }
        </div>
    );
};

export default MyBookings;