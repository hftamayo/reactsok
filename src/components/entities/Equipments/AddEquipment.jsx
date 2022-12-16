import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../store/firebase";
import { toast } from "react-tostify";
import classes from "./Equipment.module.css";

const initialState = {
  name: "",
  description: "",
  brand: "",
  status: "",
};

const AddEquipment = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, description, brand, status } = state;
  let history = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !email || !contact){
      toast.error("please provide value in each field");
    } else {
      db.child("equipments").push(state, err => {
        if(err){
          toast.error(err);
        } else {
          toast.success("Equipment added successfully");
        }
      });
      setTimeout(() => history("/equipments"), 500);
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeHolder="Equipment's name"
          value={name}
          onChange={handleInputChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          placeHolder="Equipment's description"
          value={description}
          onChange={handleInputChange}
        />
        <label htmlFor="brand">Brand</label>
        <input
          type="text"
          id="brand"
          name="brand"
          placeHolder="Equipment's brand"
          value={brand}
          onChange={handleInputChange}
        />
        <label htmlFor="status">Status</label>
        <input
          type="number"
          id="status"
          name="status"
          placeHolder="Status"
          value={status}
          onChange={handleInputChange}
        />

        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default AddEquipment;