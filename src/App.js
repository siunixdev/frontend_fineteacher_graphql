import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import "./App.css";

import AuthContext from "./context/auth-context";

// PAGES
import Login from "./pages/Auth/login";
import Register from "./pages/Auth/register";
import Home from "./pages/Home/home";
import Detail from "./pages/Detail/detail";

class App extends Component {
  state = {
    token: null,
    userId: null
  };

  static contextType = AuthContext;

  componentDidMount() {
    const auth = this.context;
    this.setState({ token: auth.token, userId: auth.userId });
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <Router>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout
          }}
        >
          <div>
            <Switch>
              {/* {this.state.token && <Redirect from="/login" to="/" exact />}
              {this.state.token && <Redirect from="/register" to="/" exact />} */}
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/detail/:id" component={Detail} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </AuthContext.Provider>
      </Router>
    );
  }
}

export default App;
