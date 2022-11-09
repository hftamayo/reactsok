/* https://www.davidhu.io/react-spinners/ */
import ClipLoader from "react-spinners/BounceLoader";
import classes from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={classes.spinner}>
      <ClipLoader color="#52bfd9" size={100} />
    </div>
  );
}

export default Spinner;
