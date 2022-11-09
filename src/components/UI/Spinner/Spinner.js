/* https://www.davidhu.io/react-spinners/ */
import ClipLoader from "react-spinners/BounceLoader";

function Spinner() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ClipLoader color="#52bfd9" size={100} />
    </div>
  );
}

export default Spinner;
