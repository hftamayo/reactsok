import ToolBar from "./ToolBar";
import classes from "./DashBoard.module.css";
import { BrowserRouter } from "react-router-dom";

function DashBoard(props) {
  return (
    <BrowserRouter>
      <ToolBar />
      <Routes>
        <Route path="/" />
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
      </Routes>
    </BrowserRouter>
  );
}

export default DashBoard;
