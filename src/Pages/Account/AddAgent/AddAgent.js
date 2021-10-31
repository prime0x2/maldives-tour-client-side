import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import './AddAgent.css';

const AddAgent = () => {

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        axios.post('https://sheltered-beach-92728.herokuapp.com/agents', data)
            .then((res) => {
                if (res.data.insertedId) {
                    alert('Agent Added Successfully...!');
                    reset();
                }
            });
    }

    return (
        <div className="page add-agent text-center">
            <h1 className="fw-bold mt-3">Add a <span className="text-warning">New</span> Travel <span className="text-warning">Agent</span></h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input {...register("name")} placeholder="Name" />
                    <input {...register("email")} placeholder="Email" />
                </div>
                <div>
                    <input type="number" {...register("phone")} placeholder="Phone" />
                    <input {...register("url")} placeholder="Website" />
                </div>
                <div>
                    <input {...register("address")} placeholder="Address" /> <br />
                    <textarea {...register("description")} placeholder="Description" /> <br />
                    <input {...register("img")} placeholder="Agent Logo" />
                </div>
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddAgent;