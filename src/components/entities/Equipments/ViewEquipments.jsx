import React, { useState, useEffect } from "react";
import fireDb from "../../store/firebase";
/* import { ref, child, get } from "firebase/database"; */
import { Link, useNavigate } from "react-router-dom";
import classes from "./Equipment.module.css";
import { toast } from "react-toastify";

const ViewEquipments = () => {
  const [data, setData] = useState({});

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
  }, []);    

/*
firebase v9 
   useEffect(() => {
    get(child(fireDb, "equipments"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData({ ...snapshot.val() });
        } else {
          setData({});
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      setData({});
    };
  }, []);
 */
  const onDelete = (id) => {
    if (
      window.confirm(
        "This action can't be rolled back, press OK for confirmation"
      )
    ) {
      fireDb.child(`equipments/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("record deleted sucessfully");
        }
      });
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Description</th>
            <th style={{ textAlign: "center" }}>Brand</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "center" }}>Operations</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope="now">{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].description}</td>
                <td>{data[id].brand}</td>
                <td>{data[id].status}</td>
                <td>
                  <Link to={`/edit-equipment/${id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(id)}
                  >
                    Delete
                  </button>
                  <Link to={`/detail-equipment/${id}`}>
                    <button className="btn btn-view">Details</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEquipments;
