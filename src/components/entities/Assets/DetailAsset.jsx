import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import fireDb from "../../store/firebase";
import classes from "../Cruds.module.css";

const DetailAsset = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fireDb.child(`assets/${id}`)
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
          <p>Asset's Details</p>
        </div>
        <div className={classes.container}>
          <strong>ID: </strong>
          <span>{id}</span>
          <br /><br />
          <strong>Name: </strong>
          <span>{data.name}</span>
          <br /><br />
          <strong>Op System: </strong>
          <span>{data.osid}</span>
          <br /><br />
          <strong>Sub Category: </strong>
          <span>{data.subcatid}</span>
          <br /><br />
          <strong>Commands: </strong>
          <span>{data.commands}</span>
          <br /><br />        
          <strong>Comments: </strong>
          <span>{data.comments}</span>
          <br /><br />          
          <strong>Status: </strong>
          <span>{data.status}</span>
          <br /><br />
          <Link to="/assets">
            <button className={classes.btn + ' ' + classes.btn_edit}>Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailAsset;
