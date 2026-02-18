import React from "react";
import { allRoutes } from "./route";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function index() {
  return (
    <BrowserRouter>
      <Switch>
        {allRoutes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            ></Route>
          );
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default index;
