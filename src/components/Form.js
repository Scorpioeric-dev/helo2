import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import styled from "styled-components";

class Form extends Component {
  state = {
    title: "",
    content: "",
    img: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createPost = () => {
    const { title, img, content } = this.state;
    axios.post(`/api/post/:userid`, { title, content, img });
    this.props.history.push("/Dashboard");
  };

  render() {
    return (
      <div>
      <Article>
      <input
      name="title"
      type="text"
      placeholder="Title"
      onChange={this.handleChange}
      />
      
      <textarea
      onChange={this.handleChange}
      rows="4"
      cols="50"
      name="content"
      type="text"
      placeholder="Type in Content"
      />
      
      <input
      onChange={this.handleChange}
      name="img"
      type="text"
      placeholder="img"
      />
      </Article>
      <Img src={this.state.img} alt="" />
        <button onClick={this.createPost}>Create Post</button>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { userId } = reduxState;
  return { userId };
}

export default connect(mapStateToProps)(Form);

const Img = styled.img`
  height: 40vh;
  width: 40vw;

  border: solid black;
  margin: 80px;
  position: relative;
`;

const Article = styled.div`
background: gray;
color: #ffffff;
display: flex;
flex-direction: column;
align-items: center;
width: 300px;
justify-content: space-evenly;
position: absolute;
left: 90px;
top: 60px;
height: 280px;
padding: 60px;
 
 `
