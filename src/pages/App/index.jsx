import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayoutRoute from "../../commons/Layout/AdminLayoutRoute";
import DefaultLayoutRoute from "../../commons/Layout/DefaultLayoutRoute";
import GlobalLoading from "../../components/GlobalLoading";
import MyModal from "../../components/MyModal";
import theme from "./../../commons/theme";
import { ADMIN_ROUTES, ROUTES } from "./../../contants";
import store from "./../../redux/store";
function App() {
  const renderAdminRoute = () => {
    let xhtml;

    xhtml = ADMIN_ROUTES.map((route) => {
      return (
        <AdminLayoutRoute
          key={"routeAdmin" + route.path}
          component={route.component}
          exact={route.exact}
          path={route.path}
          name={route.name}
        />
      );
    });

    return xhtml;
  };

  const renderDefaultRoute = () => {
    let xhtml;

    xhtml = ROUTES.map((route) => {
      return (
        <DefaultLayoutRoute
          key={"routeAdmin" + route.path}
          component={route.component}
          exact={route.exact}
          path={route.path}
          name={route.name}
        />
      );
    });

    return xhtml;
  };
  return (
    <Provider store={store()}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer autoClose={3000} />
          <GlobalLoading />
          <MyModal />
          <Switch>
            {renderAdminRoute()}
            {renderDefaultRoute()}
          </Switch>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
