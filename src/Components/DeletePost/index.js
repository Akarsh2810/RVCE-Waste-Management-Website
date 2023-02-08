import { Button } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

const DeletePost = () => {
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <Button>
        Delete Post
      </Button>
    </div>
  )
};

export default DeletePost;
