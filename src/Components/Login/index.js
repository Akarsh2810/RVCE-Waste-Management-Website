import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import LoginDetails from "../LoginDetails";

const Login = (props) => {
  const classes = useStyles();
  const { setLoading } = props;

  return (
    <div className={classes.layout}>
      <Paper className={classes.signin} elevation={24}>
        <div className={classes.signintext}>
          {" "}
          <Typography className={classes.root}>Login</Typography>
        </div>
        <LoginDetails setLoading={setLoading}></LoginDetails>
      </Paper>
    </div>
  );
};

export default Login;
