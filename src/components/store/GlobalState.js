import React, { createContext, useEffect, useState, useReducer } from "react";
import CategoriesReducer from "./CategoriesReducer";

const initialState = {
  /*   const LOGIN_URL =
    "https://movieserp-default-rtdb.firebaseio.com/categories.json";

  const [loadedCategories, setLoadedCategories] = useState([]);

  useEffect(() => {
    const fetchingData = async () => {
      const response = await fetch(LOGIN_URL, {
        method: "GET",
      });

      const responseData = await response.json();

      const fetchedCategories = [];

      for (const key in responseData) {
        fetchedCategories.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          status: responseData[key].status,
        });
      }
      setLoadedCategories(fetchedCategories);
    };
  }, []); */

  /*   loadedCategories: [
    {
      id: 1,
      name: "Cybersecurity",
      description: "Pentesting, Offensive, Defensive, DFIR, Malware",
      status: 1,
    },
  ],   */

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
