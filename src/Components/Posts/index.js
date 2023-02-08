import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useStyles } from "./styles";
import Post from "../Post";
import { Typography } from "@material-ui/core";

const Posts = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const uri = "http://localhost:8080/posts";
    axios
      .get(uri, null)
      .then((data) => {
        setPosts(data?.data);
        console.log("data", data?.data);
      })
      .catch((error) => {});
  }, []);
  return (
    <div className={classes.layout}>
      <Typography variant="h5" style={{ padding: "10px" }}>
        Recent Posts
      </Typography>
      {posts.map((post, index) => {
        return (
          <Post fullName={post?.fullName} description={post?.postStatement} />
        );
      })}
    </div>
  );
};

export default Posts;
