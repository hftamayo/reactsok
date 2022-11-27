import { Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import ToolBar from "./ToolBar";
import GlobalProvider from "../store/GlobalState";
import ViewCategories from "../Categories/ViewCategories";

function DashBoard() {
  return (
    <div>
      <ToolBar />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            path="/categories"
            exact
            element={
              <GlobalProvider>
                <ViewCategories />
              </GlobalProvider>
            }
          />
          <Route path="/newasset" />
          <Route path="/inventory" />
        </Route>
      </Routes>
    </div>
  );
}

export default DashBoard;