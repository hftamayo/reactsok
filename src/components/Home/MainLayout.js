import { Outlet } from "react-router-dom";

function MainLayout() {
  return <div className="container mx-auto"><Outlet /></div>;
}

export default MainLayout;