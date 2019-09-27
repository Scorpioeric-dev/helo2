import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import swal from "sweetalert2";
import { setUser } from "../ducks/reducer";
import { withRouter } from "react-router-dom";
import {Link } from 'react-router-dom'

class Auth extends Component {
  state = {
    password: "",
    username: ""
  };

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };

  register = () => {
    const { username, password } = this.state;
    axios
      .post("/auth/register", { username, password })
      .then(res => {
        this.setState({
          username: res.data[0].username
        });
        this.props.setUser(
          res.data[0].username,
          res.data[0].profile_pic,
          res.data[0].id
        );
        // this.props.history.push("/dashboard");
      })
      .catch(err => alert(err));
  };

  login = async () => {
    const { password, username } = this.state;
    const res = await axios.post("/auth/login", { password, username });
    if (res.data.user) {
      this.props.setUser(res.data.user);
    }
    this.props.history.push("/dashboard");
    swal.fire(res.data.message);
  };
  render() {
    return (
      <div>
        <input
          type="password"
          placeholder="Password"
          onChange={e => this.handleChange(e, "password")}
        />
        <input
          type="text"
          placeholder="username"
          onChange={e => this.handleChange(e, "username")}
        />
        <Link to="/dashboard">
          <button onClick={this.login}>Login</button>
        </Link>

        <button onClick={this.register}>Register</button>
      </div>
    );
  }
  
 }


 

export default connect(
  null,
  { setUser }
)(withRouter(Auth));
