import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import fireDb from "../../store/firebase";
import classes from "../Cruds.module.css";

const DetailSubCat = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fireDb.child(`subcats/${id}`)
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
          <p>Sub-Category's Details</p>
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
          <strong>Related to: </strong>
          <span>{data.category}</span>
          <br /><br />
          <strong>Status: </strong>
          <span>{data.status}</span>
          <br /><br />
          <Link to="/subcategories">
            <button className={classes.btn + ' ' + classes.btn_edit}>Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailSubCat;
