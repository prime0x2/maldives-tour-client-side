import React from 'react';
import Agents from '../Agents/Agents';
import Banner from '../Banner/Banner';
import Stay from '../Stay/Stay';
import Subscribe from '../Subscribe/Subscribe';

const Home = () => {
    return (
        <div className="page home">
            <Banner />
            <Agents />
            <Stay />
            <Subscribe />
        </div>
    );
};

export default Home;