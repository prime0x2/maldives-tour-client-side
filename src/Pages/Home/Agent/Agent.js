import React from 'react';
import { Link } from 'react-router-dom';
import './Agent.css';

const Agent = ({ agent }) => {
    
    const { name, description, img, _id } = agent;
    
    return (
        <div className="col">
            <div className="card single-agent h-100 p-3 p-lg-4 rounded mx-lg-2">
                <span></span><span></span><span></span><span></span>
                <img src={img} className="card-img-top rounded" alt="..." />
                <div className="card-body pt-3 px-0">
                    <h6 className="card-title fw-bold">{name}</h6>
                    <p className="card-text text-secondary">{description.slice(0, 110)}...</p>
                </div>
                <Link to={`/agent/${_id}`}>
                    <button className="btn btn-book">Book Now <i className="fas fa-angle-right"></i></button>
                </Link>
            </div>
        </div>
    );
};

export default Agent;