import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../store/firebase";
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

  const handleInputChange = () => {};

  const handleSubmit = () => {
      
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
