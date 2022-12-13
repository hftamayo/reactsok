import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import ToolBar from "./ToolBar";
import GlobalProvider from "../store/GlobalState";
import CategoryHeader from "../Categories/CategoryHeader";
import ViewCategories from "../Categories/ViewCategories";
import AddCategory from "../Categories/AddCategory";
import EditCategory from "../Categories/EditCategory";

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

          <Route path="/newasset" />
          <Route path="/inventory" />
        </Route>
      </Routes>
      </GlobalProvider>      
    </div>
  );
}

export default DashBoard;
