import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import ToolBar from "./ToolBar";
import GlobalProvider from "../store/GlobalState";
import CategoryHeader from "../Categories/CategoryHeader";
import ViewCategories from "../Categories/ViewCategories";
import AddCategory from "../Categories/AddCategory";
import EditCategory from "../Categories/EditCategory";

import EquipmentHeader from "../entities/Equipments/EquipmentHeader";
import ViewEquipments from "../entities/Equipments/ViewEquipments";
import AddEquipment from "../entities/Equipments/AddEquipment";

import { ToasterContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DashBoard() {
  return (
    <div>
      <GlobalProvider>
        <ToolBar />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              path="/categories"
              exact
              element={
                <div>
                  <CategoryHeader />
                  <ViewCategories />
                </div>
              }
            />
            <Route path="/add-category" exact element={<AddCategory />} />
            <Route path="/edit-category/:id" exact element={<EditCategory />} />

            <ToasterContainer position="top-center" />
            <Route
              path="/equipments"
              exact
              element={
                <div>
                  <EquipmentHeader />
                  <ViewEquipments />
                </div>
              }
            />
            <Route path="/add-equipment" exact element={<AddEquipment />} />
            <Route path="/edit-equipment/:id" exact element={<AddEquipment />} />

            <Route path="/newasset" />
            <Route path="/inventory" />
          </Route>
        </Routes>
      </GlobalProvider>
    </div>
  );
}

export default DashBoard;
