import MainHeader from "../../MainHeader/MainHeader";

const DashboardLayout = () => {
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
    </>
  );
};

export default DashboardLayout;
