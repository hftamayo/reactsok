import React, { Suspense } from "react";
import i18n from "../i18n";
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
