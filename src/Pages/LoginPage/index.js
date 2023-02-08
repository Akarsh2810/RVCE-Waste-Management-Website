import React, { useState } from "react";
import { useStyles } from "./styles";
import Header from "../../Components/Header";
import Login from "../../Components/Login";
import Loader from "../../utils/loader";

const LoginPage = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(null);
  return (
    <div className={classes.layout}>
      <Loader loading={loading}></Loader>
      <Header />
      <Login setLoading={setLoading}></Login>
    </div>
  );
};

export default LoginPage;
