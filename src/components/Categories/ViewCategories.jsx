import React, { useContext, Fragment } from "react";
import { GlobalContext } from "../store/GlobalState";

const ViewCategories = () => {
  const { categories } = useContext(GlobalContext);
  return (
    <Fragment>
      {categories.length > 0 ? (
        <Fragment>
          {categories.map((category) => (
            <div
              className="flex items-center bg-gray-100 mb-10 shadow"
              key={category.id}
            >
              <div className="flex-auto text-left px-4 py-2 m-2">
                <p className="text-gray-900 leading-none">{category.name}</p>
                <p className="text-gray-600">{category.description}</p>
                <span className="inline-block text-sm font-semibold mt-1">
                  {category.status}
                </span>
              </div>
            </div>
          ))}
        </Fragment>
      ) : (
        <p className="text-center bg-gray-100 text-gray-500 py-5">No records to display</p>
      )}
    </Fragment>
  );
};

export default ViewCategories;
