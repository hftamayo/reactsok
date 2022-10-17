import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./containers/App";
import "./index.css";
import { AuthProvider } from "./components/store/AuthProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
