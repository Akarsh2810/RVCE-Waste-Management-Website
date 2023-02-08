import React from "react";
import { useStyles } from "./styles";
import Header from "../../Components/Header";
import NewPost from "../../Components/NewPost";

const HomePage = () => {
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <Header />
      <NewPost />
    </div>
  );
};

export default HomePage;
