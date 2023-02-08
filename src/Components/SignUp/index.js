import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import SignUpDetails from "../SignUpDetails";

const SignUp = (props) => {
  const classes = useStyles();
  const { setLoading } = props;

  return (
    <div className={classes.layout}>
      <Paper className={classes.signin} elevation={24}>
        <div className={classes.signintext}>
          {" "}
          <Typography className={classes.root}>SignUp</Typography>
        </div>
        <SignUpDetails setLoading={setLoading}></SignUpDetails>
      </Paper>
    </div>
  );
};

export default SignUp;
