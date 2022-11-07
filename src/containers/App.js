import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
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
