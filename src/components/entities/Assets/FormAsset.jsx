import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import fireDb from "../../store/firebase";
import { toast } from "react-toastify";
import classes from "../Cruds.module.css";

const initialState = {
  name: "",
  osid: "",
  subcatid: "",
  userid: "",
  commands: "",
  comments: "",
  status: "",
};

const FormAsset = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, osid, subcatid, userid, commands, comments, status } = state;
  let history = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("assets").on("value", (snapshot) => {
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
    /*     if (!name || !description || !status || !equipment) { */
    if (!name || !osid || !subcatid || !userid || !commands || !comments || !status) {
      toast.error("please provide value in each field");
    } else {
      if (!id) {
        fireDb.child("assets").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Record added successfully");
          }
        });
      } else {
        fireDb.child(`assets/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Record updated successfully");
          }
        });
      }
      setTimeout(() => history("/assets"), 500);
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
          placeholder="Asset name"
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="osid">Operating System</label>
        {/* <select value={equipment || ""} onChange={handleInputChange}> */}
        <select name="osid" onChange={handleInputChange}>
          <option value="">Please choose a value</option>
          <option value="dell">Pop Os</option>
          <option value="cpuclon">Kali</option>
          <option value="unonucel">Android</option>
        </select>
        <label htmlFor="subcatid">Sub Category</label>
        {/* <select value={equipment || ""} onChange={handleInputChange}> */}
        <select name="subcatid" onChange={handleInputChange}>
          <option value="">Please choose a value</option>
          <option value="infosec">Infosec</option>
          <option value="frontend">FrontEnd</option>
          <option value="backend">BackEnd</option>
        </select>
        <label htmlFor="userid">Owner</label>
        {/* <select value={equipment || ""} onChange={handleInputChange}> */}
        <select name="userid" onChange={handleInputChange}>
          <option value="">Please choose a value</option>
          <option value="hftamayo">hftamayo</option>
        </select>        
        <label htmlFor="commands">Commands</label>
        <input
          type="text"
          id="commands"
          name="commands"
          placeholder="Commands"
          value={commands || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="comments">Comments</label>
        <input
          type="text"
          id="comments"
          name="comments"
          placeholder="Comments"
          value={comments || ""}
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


        {/*            type="text"
          id="equipment"
          name="equipment"
          placeholder="Installed on"
          value={equipment || ""}
          onChange={handleInputChange}  */}

        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/assets">
          <button className={classes.btn + " " + classes.btn_edit}>
            Go Back
          </button>
        </Link>
      </form>
    </div>
  );
};

export default FormAsset;
