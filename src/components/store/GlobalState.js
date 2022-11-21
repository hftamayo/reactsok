import React, { createContext, useReducer } from "react";
import CategoriesReducer from "./CategoriesReducer";

const initialState = {
  categories: [
    {
      id: 1,
      name: "Cybersecurity",
      description: "Pentesting, Offensive, Defensive, DFIR, Malware",
      status: 1,
    },
  ],
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
        categories: state.categories,
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