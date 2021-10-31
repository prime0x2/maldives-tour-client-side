import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import useData from '../../../hooks/useData';
import Agent from '../Agent/Agent';
import './Agents.css';

const Agents = () => {

    const { agents, loading } = useData();
    const location = useLocation();

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
        <div className="home-agents text-center py-5 px-lg-5">
            <div className="container">
                <h2 className="fw-bold m-0"><span className="px-3 py-2 border-bottom border-3 border-warning">BEST <span className="text-warning">TRAVEL</span> AGENTS</span></h2>

                <div className="row row-cols-1 row-cols-md-3 g-4 g-lg-5 py-5">
                    {
                        location.pathname !== "/allAgents" ?
                            (
                                agents.slice(0, 6).map(agent => (
                                    <Agent key={agent._id} agent={agent} />
                                ))
                            ) : (
                                agents.map(agent => (
                                    <Agent key={agent._id} agent={agent} />
                                ))
                            )
                    }
                </div>

                {
                    location.pathname !== "/allAgents" && <Link to="/allAgents"><button className="btn btn-regular">Check More</button></Link>
                }
            </div>
        </div>
    );
};

export default Agents;