import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from 'styled-components'

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
      const {search} = this.state
      
      axios.get(`/api/posts/:userid?title=${search}&myPosts=${!this.state.myPosts}`)
      .then(res => {
          this.setState({
              posts:res.data
          })
      })
  }

  getPosts = () => {
    axios.get("/api/posts").then(res => {
      this.setState({
        posts: res.data
      });
    });
  };

  handleChange = (e,key) => {
    this.setState({
      [key]: e.target.value
    });
  };

  render() {
      
    let mapped = this.state.posts.map(post => {
      return (
        <div key={post.id}>
          <Link to={`/post/${post.id}`}>
            <p>{post.title}</p>
            <p>{post.content}</p>
            <p>{post.username}</p>
            <Img src={post.profile_pic} alt="" />
          </Link>
        </div>
      );
    });
    return (
      <div>
        <input onChange={e => this.handleChange(e,'search')} type='text'/>
        <button onClick={this.searchTitle}>Search</button>
        <input onChange={e => this.handleChange(e,'myPosts')} type='checkbox'/>
        my Posts
        <button>Reset</button>
        {mapped}
      </div>
    );
  }
}


const Img = styled.img`
  height: 60vh;
  width: 60vw;
  box-shadow: 8px 8px black;
  border:solid black;
  margin: 80px;
  position: relative;
`

