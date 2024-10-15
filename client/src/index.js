import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import { AppContextProvider } from "./context/AppContext";
import "swiper/css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <ToastContainer
              position="bottom-left"
              autoClose={5000}
              closeOnClick
            />
            <App />
          </AppContextProvider>
        </QueryClientProvider>
      </Provider>
    </PersistGate>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
