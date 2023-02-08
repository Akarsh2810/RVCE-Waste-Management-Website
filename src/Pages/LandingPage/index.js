import React from "react";
import { useStyles } from "./styles";
import Header from "../../Components/Header";
import Posts from "../../Components/Posts";

const LandingPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <Header />
      <Posts />
    </div>
  );
};

export default LandingPage;
