import React from 'react';
import './SingleBooking.css';

const SingleBooking = ({ agent, children }) => {
    
    const { name, email, address, phone, url, description, img } = agent;
    
    return (
        <div className="px-lg-5">
            <div className="booked-agent my-3 my-lg-4">
                <div className="row align-items-center">
                    <div className="col col-md-2 text-center">
                        <img className="p-2 border border-secondary rounded" src={img} alt="" />
                    </div>
                    <div className="col col-md-10 text-start ps-lg-5 pt-4">
                        <h3 className="fw-bold"><span className="title-detail">{name}</span></h3>
                        <p className="fw-lighter my-4"><span className="text-detail">{description}</span></p>
                        
                        <div className="row booked-agent-contact">
                            <div className="col col-md-5">
                                <p><i className="fas fa-envelope"></i> &nbsp;<span className="text-detail">{email}</span></p>
                                <p><i className="fas fa-phone"></i> &nbsp;<span className="text-detail">+{phone}</span></p>
                            </div>
                            <div className="col col-md-7">
                                <p><i className="fas fa-map-marker-alt"></i> &nbsp;<span className="text-detail">{address}</span></p>
                                <p><i className="fas fa-globe"></i> &nbsp;<a className="text-detail" href={`https://${url}`} target="_blank" rel="noopener noreferrer">{url}</a> </p>
                            </div>
                        </div>
                        {
                            children
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleBooking;