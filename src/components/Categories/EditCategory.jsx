import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { GlobalContext } from '../store/GlobalState';

export const EditCategory = (props) => {

  const { categories, editCategory } = useContext(GlobalContext);

  const [selectedCategory, setSelectedCategory] = useState({
    id: null,
    name: "",
    description: "",
    status: "",
  });

  let history = useNavigate();
  let currentCategoryId = useParams();

  useEffect(() => {
    const categoryId = currentCategoryId;
    const selectedCategory = categories.find(
      (category) => category.id === parseInt(categoryId)
    );
    setSelectedCategory(selectedCategory);
  }, [currentCategoryId, categories]);


  const onSubmit = (e) => {
    e.preventDefault();
    editCategory(selectedCategory);
    history("/categories");
  };

  const handleOnChange = (categoryKey, newValue) =>
    setSelectedCategory({ ...selectedCategory, [categoryKey]: newValue });

  if (!selectedCategory || !selectedCategory.id) {
    return <div>Invalid Category ID.</div>;
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
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="status"
            >
              Status
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:text-gray-600 focus:shadow-outline"
              value={selectedCategory.status}
              onChange={(e) => handleOnChange("status", e.target.value)}
              type="text"
              placeholder="Enter status"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="block mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:text-gray-600 focus:shadow-outline">
              Edit Category
            </button>
          </div>
          <div className="text-center mt-4 text-gray-500">
            <Link to="/categories">Cancel</Link>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default EditCategory;