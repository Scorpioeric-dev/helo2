import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default class Dashboard extends Component {
  state = {
    search: "",
    myPosts: true,
    posts: []
  };

  componentDidMount() {
    this.getPosts();
  }

  searchTitle = () => {
    const { search } = this.state;
    const { userId } = this.props;
    // console.log(this.props.userId)
    axios
      .get(`/api/posts/:userid?title=${search}&myPosts=${!this.state.myPosts}`)
      .then(res => {
        this.setState({
          posts: res.data
        });
      });
  };

  getPosts = () => {
    axios.get("/api/posts").then(res => {
      this.setState({
        posts: res.data
      });
    });
  };

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };

  flipPost = () => {
    this.setState({
      myPosts: !this.state.myPosts
    });
  };

  render() {
    //mapping over posts
    let mapPost = this.state.posts.map(post => {
      return (
        <div key={post.id}>
          <Link to={`/post/${post.id}`}>
          <Title>Title: {post.title}</Title>
          <Content>Content: {post.content}</Content>
            <User>Username:{post.username}</User>
            <Img src={post.profile_pic} alt="" />
          </Link>
        </div>
      );
    });
    return (
      <Section>
        <input onChange={e => this.handleChange(e, "search")} type="text" />
        <button onClick={this.searchTitle}>Search</button>
        <input onChange={this.flipPost} name="myPosts" type="checkbox" />
        my Posts
        {mapPost}
      </Section>
    );
  }
}

const Img = styled.img`
  height: 60vh;
  width: 60vw;
  box-shadow: 8px 8px black;
  border: solid black;
  margin: 80px;
  position: relative;
`;
const Title = styled.h1`
  font-family: cursive;
`;
const Content = styled.h1`
  font-family: cursive;
`;
const User = styled.h1`
  font-family: cursive;
`;
// const Main = styled.div`
//   display: flex;
//   justify-content: space-between;
  
// `;
const Section = styled.div`
display:flex;
align-content:flex-start;
align-items:flex-start;
justify-content:space-around;
flex-direction:column;


`
