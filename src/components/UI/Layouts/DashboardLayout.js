import MainHeader from "../../MainHeader/MainHeader";
import MainFooter from "../../MainFooter/MainFooter";

const DashboardLayout = () => {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      <MainFooter />
    </>
  );
};

export default DashboardLayout;
