import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import fireDb from "../../store/firebase";
import classes from "../Cruds.module.css";

const DetailOs = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fireDb.child(`oses/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData({ ...snapshot.val() });
        } else {
          setData({});
        }
      });
  }, [id]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className={classes.card}>
        <div className={classes.card_header}>
          <p>Operation System's Details</p>
        </div>
        <div className={classes.container}>
          <strong>ID: </strong>
          <span>{id}</span>
          <br /><br />
          <strong>Name: </strong>
          <span>{data.name}</span>
          <br /><br />
          <strong>Description: </strong>
          <span>{data.description}</span>
          <br /><br />
          <strong>Installed On: </strong>
          <span>{data.equipmentid}</span>
          <br /><br />
          <strong>Status: </strong>
          <span>{data.status}</span>
          <br /><br />
          <Link to="/oses">
            <button className={classes.btn + ' ' + classes.btn_edit}>Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailOs;
