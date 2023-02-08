import React from "react";
import { useStyles } from "./styles";
import { Divider, Typography } from "@material-ui/core";
import FullName from "../FullName";

const Post = (props) => {
  const {fullName, description} = props;
  const classes = useStyles();
  return (
    <>
      <div className={classes.layout}>
        <Typography variant="subtitle2">{description}</Typography>
        <FullName fullName={fullName}></FullName>
      </div>
      <Divider></Divider>
    </>
  );
};

export default Post;
