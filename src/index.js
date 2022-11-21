import { createRoot } from "react-dom/client";
import App from "./containers/App";
import "./index.css";
import { AuthProvider } from "./components/store/AuthProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <AuthProvider>
      <App />
  </AuthProvider>
);
