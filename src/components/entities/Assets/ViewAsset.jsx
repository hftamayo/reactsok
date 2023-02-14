import React, { useState, useEffect } from "react";
import fireDb from "../../store/firebase";
/* import { ref, child, get } from "firebase/database"; */
import { Link, useNavigate } from "react-router-dom";
import classes from "../Cruds.module.css";
import { toast } from "react-toastify";

const ViewAsset = () => {
  const [data, setData] = useState({});

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
      fireDb.child(`assets/${id}`).remove((err) => {
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
      <table className={classes.styled_table}>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Op System</th>
            <th style={{ textAlign: "center" }}>Sub Category</th>
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
                <td>{data[id].osid}</td>
                <td>{data[id].subcatid}</td>
                <td>{data[id].status}</td>
                <td>
                  <Link to={`/edit-asset/${id}`}>
                    <button className={classes.btn + ' ' + classes.btn_edit}>Edit</button>
                  </Link>
                  <button
                    className={classes.btn + ' ' + classes.btn_delete}
                    onClick={() => onDelete(id)}
                  >
                    Delete
                  </button>
                  <Link to={`/detail-asset/${id}`}>
                    <button className={classes.btn + ' '+classes.btn_view}>Details</button>
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

export default ViewAsset;
