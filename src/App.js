import React from "react";

import Nav from "./components/Nav";
import {withRouter} from 'react-router-dom'

import routes from "./routes";
import "./App.css";

function App() {
  return (
    <div className="App">
      {this.props.location.pathname === "/" ? (
        <Auth />
      ) : (
        <div>
          <Nav />
          {routes}
        </div>
      )}
    </div>
  );
}

export default withRouter(App);
