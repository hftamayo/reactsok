import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Spinner from "../components/UI/Spinner/Spinner";
import Sok from "../components/Sok";
import i18n from "../i18n";

const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Sok />
      </BrowserRouter>
    </Suspense>
  );
};
export default App;
