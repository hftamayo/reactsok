import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import fireDb from "../../store/firebase";
import classes from "../Cruds.module.css";

const DetailEquipment = () => {
  const [equipment, setEquipment] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fireDb.child(`equipments/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setEquipment({ ...snapshot.val() });
        } else {
          setEquipment({});
        }
      });
  }, [id]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className={classes.card}>
        <div className={classes.card_header}>
          <p>Equipment's Details</p>
        </div>
        <div className={classes.container}>
          <strong>ID: </strong>
          <span>{id}</span>
          <br /><br />
          <strong>Name: </strong>
          <span>{equipment.name}</span>
          <br /><br />
          <strong>Description: </strong>
          <span>{equipment.description}</span>
          <br /><br />
          <strong>Brand: </strong>
          <span>{equipment.brand}</span>
          <br /><br />
          <strong>Status: </strong>
          <span>{equipment.status}</span>
          <br /><br />
          <Link to="/equipments">
            <button className={classes.btn + ' ' + classes.btn_edit}>Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailEquipment;
