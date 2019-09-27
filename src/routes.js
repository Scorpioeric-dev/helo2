import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Form from "./components/Form";
import DashBoard from "./components/Dashboard";

import Post from "./components/Post";

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/dashboard" component={DashBoard} />
    <Route path="/post/:postid" component={Post} />
    <Route path="/new" component={Form} />
  </Switch>
);
