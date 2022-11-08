import React, { Suspense } from "react";
import Sok from "../components/Sok";

const App = () => {
  return (
    //<Suspense fallback= {<Loading />}>
    <Suspense>
      <Sok />
    </Suspense>
  );
};
export default App;
