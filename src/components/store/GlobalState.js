import React, { createContext, useEffect, useState, useReducer } from "react";
import CategoriesReducer from "./CategoriesReducer";

const initialState = {
  categories: [],
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
        categories:
          state.categories /* this 2 vars need to have the same name */,
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
