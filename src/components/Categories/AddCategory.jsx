import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GlobalContext } from "../store/GlobalState";

export const AddCategory = () => {
  let history = useNavigate();

  const { addCategory, categories } = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      id: categories.length + 1,
      name,
      description,
      status,
    };
    addCategory(newCategory);
    history("/twcategories");
  };

  return (
    <React.Fragment>
      <div className="w-full max-w-sm container mt-20 mx-auto">
        <form onSubmit={onSubmit}>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Name of category
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter a name"
            />
          </div>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Enter a description"
            />
          </div>
          <div className="w-full mb-5">
            <input
              checked
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              id="status"
              value={status}
              onChange={() => setStatus(!status)}
            />
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="status"
            >
              Is Active?
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Category
            </button>
          </div>
          <div className="text-center mt-4 text-gray-500">
            <Link to="/twcategories">Cancel</Link>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddCategory;
