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
import FormEquipment from "../entities/Equipments/FormEquipment";
import DetailEquipment from "../entities/Equipments/DetailEquipment";

import OsHeader from "../entities/Os/OsHeader";
import ViewOs from "../entities/Os/ViewOs";
import FormOs from "../entities/Os/FormOs";
import DetailOs from "../entities/Os/DetailOs";

import { ToastContainer } from "react-toastify";

function DashBoard() {
  return (
    <div>
      <GlobalProvider>
        <ToolBar />
        <ToastContainer position="top-center" />
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
            <Route
              path="/edit-equipment/:id"
              exact
              element={<AddEquipment />}
            />
            <Route
              path="/detail-equipment/:id"
              exact
              element={<DetailEquipment />}
            />

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
            <Route path="/add-equipment" exact element={<FormEquipment />} />
            <Route
              path="/edit-equipment/:id"
              exact
              element={<FormEquipment />}
            />
            <Route
              path="/detail-equipment/:id"
              exact
              element={<DetailEquipment />}
            />

            <Route
              path="/oses"
              exact
              element={
                <div>
                  <OsHeader />
                  <ViewOs />
                </div>
              }
            />
            <Route path="/add-os" exact element={<FormOs />} />
            <Route path="/edit-os/:id" exact element={<FormOs />} />
            <Route path="/detail-os/:id" exact element={<DetailOs />} />

            <Route path="/newasset" />
            <Route path="/inventory" />
          </Route>
        </Routes>
      </GlobalProvider>
    </div>
  );
}

export default DashBoard;
