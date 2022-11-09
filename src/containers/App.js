import React, { Suspense } from "react";
import Spinner from "../components/UI/Spinner/Spinner";
import Sok from "../components/Sok";
import i18n from "../i18n";

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Sok />
    </Suspense>
  );
};
export default App;
