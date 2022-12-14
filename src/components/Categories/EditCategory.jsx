import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { GlobalContext } from "../store/GlobalState";

export const EditCategory = (props) => {
  const { categories, editCategory } = useContext(GlobalContext);

  const [selectedCategory, setSelectedCategory] = useState({
    id: null,
    name: "",
    description: "",
    status: "",
  });

  let history = useNavigate();
  const { id } = useParams(); /* to extract properly the param please use curly brackets and same name from the origin */ 
  console.log("requested category for edition: " + id);

  useEffect(() => {
    const categoryId = id;
    const selectedCategory = categories.find(
      (category) => category.id === parseInt(categoryId)
    );
    console.log("the selectedCategory is: " + selectedCategory);
    setSelectedCategory(selectedCategory);
  }, [id, categories]);

  const onSubmit = (e) => {
    e.preventDefault();
    editCategory(selectedCategory);
    history("/twcategories");
  };

  const handleOnChange = (categoryKey, newValue) =>
    setSelectedCategory({ ...selectedCategory, [categoryKey]: newValue });

  if (!selectedCategory || !selectedCategory.id) {
    return (
      <React.Fragment>
        <div>Invalid Category ID.</div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="w-full max-w-sm container mt-20 mx-auto">
        <form onSubmit={onSubmit}>
          <div className="w-full mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Name of Category
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={selectedCategory.name}
              onChange={(e) => handleOnChange("name", e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </div>
          <div className="w-full  mb-5">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={selectedCategory.description}
              onChange={(e) => handleOnChange("description", e.target.value)}
              type="text"
              placeholder="Enter description"
            />
          </div>
          <div className="w-full  mb-5">
            <input
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              value={selectedCategory.status}
              onChange={(e) => handleOnChange("status", e.target.value)}
              type="checkbox"
              placeholder="Enter status"
            />
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="status"
            >
              Is Active?
            </label>            
          </div>
          <div className="flex items-center justify-between">
            <button className="block mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline">
              Edit Category
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

export default EditCategory;
