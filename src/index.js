import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./containers/App";
import "./index.css";
import { AuthContextProvider } from "./components/store/auth-context";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
