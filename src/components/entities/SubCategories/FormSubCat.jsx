import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import fireDb from "../../store/firebase";
import { toast } from "react-toastify";
import classes from "../Cruds.module.css";

const initialState = {
  name: "",
  description: "",
  status: "",
  category: "",
};

const FormCategory = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, description, status, category } = state;
  let history = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fireDb.child("subcats").on("value", (snapshot) => {
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
    if (!name || !description || !status) {
      toast.error("please provide value in each field");
    } else {
      if (!id) {
        fireDb.child("subcats").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Record added successfully");
          }
        });
      } else {
        fireDb.child(`subcats/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Record updated successfully");
          }
        });
      }
      setTimeout(() => history("/subcats"), 500);
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
          placeholder="SubCat's name"
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="SubCat's description"
          value={description || ""}
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
        <label htmlFor="category">Related to</label>
        {/* <select value={equipment || ""} onChange={handleInputChange}> */}
        <select name="category" onChange={handleInputChange}>
          <option value="">Please choose a value</option>
          <option value="infosec">InfoSec</option>
          <option value="web3">Web 3</option>
          <option value="backend">BackEnd Dev</option>
          <option value="frontend">FrontEnd Dev</option>
          <option value="devops">DevOps</option>
          <option value="machinelearning">Machine Learning</option>
        </select>

        {/*            type="text"
          id="equipment"
          name="equipment"
          placeholder="Installed on"
          value={equipment || ""}
          onChange={handleInputChange}  */}

        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/oses">
          <button className={classes.btn + " " + classes.btn_edit}>
            Go Back
          </button>
        </Link>
      </form>
    </div>
  );
};

export default FormCategory;
