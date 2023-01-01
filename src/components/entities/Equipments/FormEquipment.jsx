import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import fireDb from "../../store/firebase";
import { toast } from "react-toastify";
import classes from "../Cruds.module.css";

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

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("equipments").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }
    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !brand || !status) {
      toast.error("please provide value in each field");
    } else {
      if (!id) {
        fireDb.child("equipments").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Record added successfully");
          }
        });
      } else {
        fireDb.child(`equipments/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Record updated successfully");
          }
        });
      }
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
          autoFocus={true}
          id="name"
          name="name"
          placeholder="Equipment's name"
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Equipment's description"
          value={description || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="brand">Brand</label>
        <input
          type="text"
          id="brand"
          name="brand"
          placeholder="Equipment's brand"
          value={brand || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="status">Status</label>
        <input
          type="number"
          id="status"
          name="status"
          placeholder="Status"
          value={status || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/equipments">
          <button className={classes.btn + " " + classes.btn_edit}>
            Go Back
          </button>
        </Link>
      </form>
    </div>
  );
};

export default AddEquipment;
