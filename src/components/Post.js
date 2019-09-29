import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

export default class Post extends Component {
  state = {
    post: []
  };
  componentDidMount() {
    this.getOnePost();
  }

  getOnePost = () => {
    const { postid } = this.props.match.params;
    axios.get(`/api/post/${postid}`).then(res => {
      this.setState({
        post: res.data
      });
    });
  };



  render() {
      console.log(this.props.match.params.postid)
    let onePost = this.state.post.map(post => {
      return (
        <Posts>
          <div key={post.id}>
            <h1>Title: {post.title}</h1>
            <h1>Content: {post.content}</h1>
          </div>
          <Img src={post.img} alt="post" />
          <h2> Username: {post.username}</h2>
          <img src={post.profile_pic} alt="profile" />
        </Posts>
      );
    });
    return <div>{onePost}</div>;
  }
}

const Posts = styled.div`
  display: flex;
  border: 1px solid red;
  justify-content: space-between;
`;
const Img = styled.img`
  height: 30vh;
  width: 30vw;
  
  border: solid black;
  margin: 80px;
  position: relative;
`;

