import React, { createContext, useReducer } from "react";
import CategoriesReducer from "./CategoriesReducer";

const LOGIN_URL =
  "https://movieserp-default-rtdb.firebaseio.com/categories.json";

  
const initialState = async () => {

const response = await fetch(LOGIN_URL, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("The data could not be shown");
  }

  const responseData = await response.json();

  const loadedCategories = [];

  for (const key in responseData) {
    loadedCategories.push({
      id: key,
      name: responseData[key].name,
      description: responseData[key].description,
      status: responseData[key].status,
    });
  }
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CategoriesReducer, initialState);

  function addCategory(category) {
    dispatch({
      type: "ADD_CATEGORY",
      payload: category,
    });
  }

  function editCategory(category) {
    dispatch({
      type: "EDIT_CATEGORY",
      payload: category,
    });
  }

  function removeCategory(id) {
    dispatch({
      type: "REMOVE_CATEGORY",
      payload: id,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        categories: state.loadedCategories,
        addCategory,
        editCategory,
        removeCategory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
