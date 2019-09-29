import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import swal from "sweetalert2";
import { setUser } from "../ducks/reducer";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
//creating a new user in db
  register = () => {
    const { username, password } = this.state;
    axios
      .post("/auth/register", { username, password })
      .then(res => {
        this.setState({
          username: res.data[0],
          profile_pic: res.data[0]
        });
        const { username, profile_pic, id: userId } = res.data[0];
        this.props.setUser({ username, profile_pic, userId });
        this.props.history.push("/dashboard");
      })
      .catch(err => alert(err));
  };

  // login = async () => {
  //   const { password, username } = this.state;
  //   const res = await axios.post("/auth/login", { password, username });
  //   if (res.data.user) {
  //     this.props.setUser(res.data.user);
  //   }
  //   this.props.history.push("/dashboard");
  //   swal.fire(res.data.message);
  // };
//allowing access to a registered user
  login = () => {
    const { username, password } = this.state;
    axios.post("/api/auth/login", { username, password }).then(res => {
      this.setState({
        username: res.data[0],
        profile_pic: res.data[0]
      });
      console.log(res.data);
      const { username, profile_pic, id: userId } = res.data[0];
      this.props.setUser({ username, profile_pic, userId });
      this.props.history.push("/dashboard");
    });
  };

  render() {
    return (
      <Main>
        <input
          type="text"
          placeholder="Username"
          onChange={e => this.handleChange(e, "username")}
        />
        <input
        type="password"
        placeholder="Password"
        onChange={e => this.handleChange(e, "password")}
        />
        
        <Link to="/dashboard">
          <button onClick={this.login}>Login</button>
        </Link>
        <button onClick={this.register}>Register</button>
      </Main>
    );
  }
}

export default connect(
  null,
  { setUser }
)(withRouter(Auth));

const Button = styled.div`
  border-radius: 8px;
  color: white;
  background-color: blue;
  border: solid black;
  font-size: 1rem;
  width: 5vw;
  display: flex;
  align-items: center;
`;

const Main = styled.div`
  background: #ff70a6;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  justify-content: space-evenly;
  position: absolute;
  left: 90px;
  top: 60px;
  height: 380px;
  padding: 60px;
  
`;
