import { Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import CreatePost from "../CreatePost";
import YourPosts from "../YourPosts";

const NewPost = () => {
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <Typography variant="h5" style={{padding: "10px"}}>Your Activity :-</Typography>
      {/* <CreatePost></CreatePost> */}
      <YourPosts></YourPosts>
    </div>
  )
};

export default NewPost;
