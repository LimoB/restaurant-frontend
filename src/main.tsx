import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

import "./index.css"; // 👈 Ensure this points to the file with Tailwind directives
import App from "./App";
import { store, persistor } from "./store/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div className="text-center mt-10">Loading...</div>} persistor={persistor}>
        <App />
        <Toaster position="top-center" />
      </PersistGate>
    </Provider>
  </StrictMode>
);
