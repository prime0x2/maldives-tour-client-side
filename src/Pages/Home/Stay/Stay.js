import React, { useEffect, useState } from 'react';
import './Stay.css';

const Stay = () => {

    const [stays, setStays] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('https://sheltered-beach-92728.herokuapp.com/stay')
            .then(res => res.json())
            .then(data => {
                setStays(data);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return (
            <div className="text-center">
                <div className="spinner-grow text-primary m-5 text-center" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="home-stay container text-center py-5 px-lg-5">
            <h2 className="text-warning fw-bold"><span className="px-3 py-2 border-bottom border-warning border-3">STAY</span></h2>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 py-5 text-start">
                {
                    stays.map((stay, index) => (
                        <div key={index} className="col">
                            <div className="single-stay d-flex flex-column shadow-lg">
                                <img src={stay.img} className="img-fluid" alt="" />
                                <div className="px-3 py-4">
                                    <h4 className="text-info fw-bold">{stay.name}</h4>
                                    <p className="">{stay.description.slice(0, 80)}...</p>
                                    <button className="btn btn-explore mt-1 fw-bold">Explore</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Stay;