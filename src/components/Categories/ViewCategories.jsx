import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../store/firebase";

const ViewCategories = () => {
  /* const { categories, removeCategory } = useContext(GlobalContext); */
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const categoriesRef = query(
      collection(db, "categories"),
      orderBy("created", "desc")
    );
    onSnapshot(categoriesRef, (snapshot) => {
      setCategories(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <Fragment>
      {categories.map((category) => (
        <Category
          id={category.id}
          key={category.id}
          name={category.data.name}
          description={category.data.description}
          status={category.data.status}
        />
      ))}
    </Fragment>
  );
};

export default ViewCategories;
