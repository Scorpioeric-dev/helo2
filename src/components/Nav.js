import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../ducks/reducer";

class Nav extends Component {
  componentDidMount(){
      try{
          this.getMine()
      } catch (err) {
          this.props.history.push('/')
      }
  }

  getMine = () => {
      axios.get('/api/mine').then(res => {
          this.props.setUser(res.data.user)
      })
  }
  logout = () => {
    axios.post("/api/logout").then(res => {
      this.props.history.push("/");
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.username}
        <img src={this.props.profile_pic} alt="" />
        
        <Link to="/dashBoard">
          <button>Home</button>
        </Link>
       
        <Link to="/new">
          <button>New Post</button>
        </Link>
       
        <Link to="/">
          <button onClick={this.logout}>Logout</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { username, profile_pic, userId } = reduxState;
  return { username, profile_pic, userId };
}

export default connect(
  mapStateToProps,
  { setUser }
)(Nav);
