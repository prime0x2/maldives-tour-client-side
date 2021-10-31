import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './AgentDetails.css';
import useAuth from '../../../hooks/useAuth';

const AgentDetails = () => {
    
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const [agent, setAgent] = useState(null);
    const [loading, setLoading] = useState(true);
    const { agentID } = useParams();
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/';
    
    useEffect(() => {
        setLoading(true);
        fetch(`https://sheltered-beach-92728.herokuapp.com/agents/${agentID}`)
            .then(res => res.json())
            .then(data => {
                setAgent(data);
                setLoading(false);
            });
    }, [agentID]);
    
    if (loading) {
        return (
            <div className="page text-center">
                <div className="spinner-grow text-primary m-5 text-center" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    
    const { name, email, address, phone, url, description, img } = agent;
    
    
    const onSubmit = (data) => {
        data.agent = agent;
        data.author = user.email;
        data.status = 'Pending';
        
        axios.post('https://sheltered-beach-92728.herokuapp.com/booking', data)
            .then((res) => {
                if (res.data?.insertedId) {
                    alert('Booking Pending...!');
                    reset();
                    history.push(redirect_uri);
                }
            });
    }
    
    return (
        <div className="page px-lg-5">
            <div className="agent-details mt-lg-5">
                <div className="row align-items-center">
                    <div className="col col-md-2 text-center">
                        <img className="p-2 border border-secondary rounded" src={img} alt="" />
                    </div>
                    <div className="col col-md-10 text-start ps-lg-5">
                        <h3 className="fw-bold"><span className="title-detail">{name}</span></h3>
                        <p className="fw-lighter my-4"><span className="text-detail">{description}</span></p>
                        
                        <div className="agent-detail-contact d-flex flex-wrap justify-content-between align-items-center">
                            <div>
                                <p><i className="fas fa-envelope"></i> &nbsp;<span className="text-detail">{email}</span></p>
                                <p><i className="fas fa-phone"></i> &nbsp;<span className="text-detail">+{phone}</span></p>
                            </div>
                            <div>
                                <p><i className="fas fa-map-marker-alt"></i> &nbsp;<span className="text-detail">{address}</span></p>
                                <p><i className="fas fa-globe"></i> &nbsp; <a className="text-detail" href={`https://${url}`} target="_blank" rel="noopener noreferrer">{url}</a> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div className="booking-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name")} placeholder="Name" />
                    <input {...register("address")} placeholder="Address" />
                    <input type="number" {...register("phone")} placeholder="Phone" />
                    <input type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AgentDetails;