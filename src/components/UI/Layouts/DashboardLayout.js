import MainHeader from "../../MainHeader/MainHeader";
import MainFooter from "../../MainFooter/MainFooter";

const DashboardLayout = (props) => {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      <MainFooter />
    </>
  );
};

export default DashboardLayout;
