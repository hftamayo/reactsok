import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import classes from "../entities/Cruds.module.css";
import ToolBar from "./ToolBar";
// import GlobalProvider from "../entities/junk/mui-assets/GlobalState";

import EquipmentHeader from "../entities/Equipments/EquipmentHeader";
import ViewEquipments from "../entities/Equipments/ViewEquipments";
import FormEquipment from "../entities/Equipments/FormEquipment";
import DetailEquipment from "../entities/Equipments/DetailEquipment";

import OsHeader from "../entities/Os/OsHeader";
import ViewOs from "../entities/Os/ViewOs";
import FormOs from "../entities/Os/FormOs";
import DetailOs from "../entities/Os/DetailOs";

import CategoryHeader from "../entities/Categories/CategoryHeader";
import ViewCategory from "../entities/Categories/ViewCategory";
import FormCategory from "../entities/Categories/FormCategory";
import DetailCategory from "../entities/Categories/DetailCategory";

import SubCatHeader from "../entities/SubCategories/SubCatHeader";
import ViewSubCat from "../entities/SubCategories/ViewSubCat";
import FormSubCat from "../entities/SubCategories/FormSubCat";
import DetailSubCat from "../entities/SubCategories/DetailSubCat";

import AssetHeader from "../entities/Assets/AssetHeader";
import ViewAsset from "../entities/Assets/ViewAsset";
import FormAsset from "../entities/Assets/FormAsset";
import DetailAsset from "../entities/Assets/DetailAsset";

import { ToastContainer } from "react-toastify";

function DashBoard() {
  return (
    <div>
      {/* <GlobalProvider> */}
      <ToolBar />
      <ToastContainer position="bottom-left" />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* <Route
              path="/twcategories"
              exact
              element={
                <div>
                  <CategoriesHeader />
                  <ViewCategories />
                </div>
              }
            />
            <Route path="/add-twcategory" exact element={<AddCategory />} />
            <Route path="/edit-twcategory/:id" exact element={<EditCategory />} /> */}

            <Route
              path="/equipments"
              exact
              element={
                <div className={classes.component_container}>
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

            <Route
              path="/categories"
              exact
              element={
                <div>
                  <CategoryHeader />
                  <ViewCategory />
                </div>
              }
            />
            <Route path="/add-category" exact element={<FormCategory />} />
            <Route path="/edit-category/:id" exact element={<FormCategory />} />
            <Route
              path="/detail-category/:id"
              exact
              element={<DetailCategory />}
            />

            <Route
              path="/subcategories"
              exact
              element={
                <div>
                  <SubCatHeader />
                  <ViewSubCat />
                </div>
              }
            />
            <Route path="/add-subcat" exact element={<FormSubCat />} />
            <Route path="/edit-subcat/:id" exact element={<FormSubCat />} />
            <Route path="/detail-subcat/:id" exact element={<DetailSubCat />} />

            <Route
              path="/assets"
              exact
              element={
                <div>
                  <AssetHeader />
                  <ViewAsset />
                </div>
              }
            />
            <Route path="/add-asset" exact element={<FormAsset />} />
            <Route path="/edit-asset/:id" exact element={<FormAsset />} />
            <Route path="/detail-asset/:id" exact element={<DetailAsset />} />

            <Route path="/inventory" />
          </Route>
        </Routes>
      {/* </GlobalProvider> */}
    </div>
  );
}

export default DashBoard;
