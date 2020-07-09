import React from "react";
import TaskBoard from "../TaskBoard";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./../../commons/theme";
import { Provider } from "react-redux";
import store from "./../../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalLoading from "../../components/GlobalLoading";
function App() {
  return (
    <Provider store={store()}>
      <ThemeProvider theme={theme}>
        <ToastContainer autoClose={3000} />
        <TaskBoard />
        <GlobalLoading />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
