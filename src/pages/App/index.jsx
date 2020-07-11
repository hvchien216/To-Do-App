import React from "react";
import TaskBoard from "../TaskBoard";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./../../commons/theme";
import { Provider } from "react-redux";
import store from "./../../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalLoading from "../../components/GlobalLoading";
import MyModal from "../../components/MyModal";
import { BrowserRouter as Router, Route } from "react-router-dom";
function App() {
  return (
    <Provider store={store()}>
      <Router>
        <ThemeProvider theme={theme}>
          <ToastContainer autoClose={3000} />
          <GlobalLoading />
          <MyModal />
          <Route path="/" component={TaskBoard} />
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
