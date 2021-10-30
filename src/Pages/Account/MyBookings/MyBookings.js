import React, { useEffect, useState } from 'react';
import './MyBookings.css';
import useAuth from '../../../hooks/useAuth';
import SingleBooking from '../SingleBooking/SingleBooking';

const MyBookings = () => {
    
    const { user } = useAuth();
    const [myBookings, setMyBookings] = useState([]);
    
    useEffect(() => {
        const author = { author : user.email };
        fetch('http://localhost:5000/myBookings', {
                method: 'POST',
                headers: { 'content-type' : 'application/json' },
                body: JSON.stringify(author)
            })
            .then(res => res.json())
            .then(data => {
                if (data[0]) {
                    const allBookings = data.map(x => x.agent);
                    setMyBookings(allBookings);
                }
                else {
                    alert('You didn\'t book anything yet...!!!');
                }
            });
    }, [user.email]);
    
    return (
        <div className="page text-center">
            {
                myBookings[0] ? <h2 className="fw-bold mt-3">My <span className="text-warning">Bookings</span> : {myBookings.length}</h2> : <h2>No <span className="text-warning">Bookings</span> Yet</h2>
            }
            
            {
                myBookings.map(agent => (
                    <SingleBooking key={agent._id} agent={agent} />
                ))
            }
        </div>
    );
};

export default MyBookings;