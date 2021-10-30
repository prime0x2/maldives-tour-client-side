import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import './AddAgent.css';

const AddAgent = () => {
    
    const { register, handleSubmit, reset } = useForm();
    
    const onSubmit = (data) => {
        axios.post('http://localhost:5000/agents', data)
            .then((res) => {
                if (res.data.insertedId) {
                    alert('Agent Added Successfully...!');
                    reset();
                }
            });
    }
    
    return (
        <div className="page add-agent text-center">
            <h1>Add a New Travel Agent</h1>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name")} placeholder="Name" />
                <input {...register("email")} placeholder="Email" />
                <input {...register("address")} placeholder="Address" />
                <input type="number" {...register("phone")} placeholder="Phone" />
                <input {...register("url")} placeholder="Website" />
                <textarea {...register("description")} placeholder="Description" />
                <input {...register("img")} placeholder="Agent Logo" />
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddAgent;