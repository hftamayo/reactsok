import React, { useState, useEffect } from "react";
import { db } from "../../store/firebase";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Equipment.module.css";

const ViewEquipments = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    db.child("equipments").on("value", (snapshot) => {
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEquipments;
