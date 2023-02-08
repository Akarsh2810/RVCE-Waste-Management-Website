import React, { useState } from "react";
import Header from "../../Components/Header";
import SignUp from "../../Components/SignUp";
import Loader from "../../utils/loader";
import { useStyles } from "./styles";

const SignUpPage = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(null);
  return (
    <div className={classes.layout}>
      <Loader loading={loading}></Loader>
      <Header />
      <SignUp setLoading={setLoading}></SignUp>
    </div>
  )
};

export default SignUpPage;
