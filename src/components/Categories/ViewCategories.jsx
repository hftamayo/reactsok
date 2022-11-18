import React, { useContext, Fragment } from "react";
import { GlobalContext } from "../store/GlobalState";

const ViewCategories = () => {
  const { categories } = useContext(GlobalContext);
  return (
    <Fragment>
      {categories.length > 0 ? (
        <Fragment>
          {categories.map((category) => (
            <div key={category.id}>
              <div>
                <p>{category.name}</p>
                <p>{category.description}</p>
                <span>{category.status}</span>
              </div>
            </div>
          ))}
        </Fragment>
      ) : (
        <p>No records to display</p>
      )}
    </Fragment>
  );
};

export default ViewCategories;