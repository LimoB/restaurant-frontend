// 📁 src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";
import { store, persistor } from "./store/store";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ Theme context

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={<div className="text-center mt-10">Loading...</div>}
        persistor={persistor}
      >
        <ThemeProvider> {/* ✅ Apply theme context globally */}
          <CartProvider>
            <App />
            <Toaster position="top-center" />
          </CartProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
