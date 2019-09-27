import React from "react";

import Nav from "./components/Nav";
import {withRouter} from 'react-router-dom'
import Auth from './components/Auth'
import routes from "./routes";
import "./App.css";

function App(props) {
  console.log(props)
  return (
    <div className="App">
      {props.location.pathname === "/" ? (
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
