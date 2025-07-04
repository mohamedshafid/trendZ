import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./contexts/AppContext.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { registerSW } from "virtual:pwa-register";

registerSW();


const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster
          toastOptions={{
            style: {
              fontSize: "16px",
              backgroundColor: "white",
              color: "#060d26",
              fontWeight: "200",
              borderRadius: "8px",
              padding: "12px 16px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            },
          }}
        />
      </QueryClientProvider>
    </BrowserRouter>
  </AppProvider>
);
