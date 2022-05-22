import React from "react";
import { createBrowserHistory } from "history";
import NotFound from "../../pages/notFound";
import Home from "../../pages/home";
import Feed from "../../pages/feed";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

const history = createBrowserHistory();

function AuthRoute() {
  const { user } = useSelector((state) => state.root);
  return (
    <Router history={history}>
      {user.isLoggedIn ? (
        <Switch>
          <Route path="/feed" exact component={Feed} />
          <Route
            exact
            path="/"
            render={() => {
              return user.isLoggedIn && <Redirect to="/feed" />;
            }}
          />
          <Route component={NotFound} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" component={Home} />

          <Route component={NotFound} />
        </Switch>
      )}
    </Router>
  );
}

export default AuthRoute;
