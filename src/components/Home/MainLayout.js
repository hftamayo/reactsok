import classes from "./DashBoard.module.css";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return <main className={classes.content}><Outlet /></main>;
}

export default MainLayout;