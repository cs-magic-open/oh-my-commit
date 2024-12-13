import { Provider } from "jotai";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { CommitPage } from "./pages/commit.page";
import "./styles/global.css";

const App: React.FC = () => {
  const [showApp, setShowApp] = useState(false);

  if (!showApp) {
    // return <InitAnimation onEnter={() => setShowApp(true)} />;
  }

  return (
    <Provider>
      {/* <MockDataProvider> */}
      <CommitPage />
      {/* </MockDataProvider> */}
    </Provider>
  );
};

window.addEventListener("load", () => {
  const container = document.getElementById("root");
  if (!container) {
    console.error("Root element not found");
    return;
  }

  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});