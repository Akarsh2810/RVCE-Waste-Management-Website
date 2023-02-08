import { Button } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import history from "../../Routes/history";

const UserAccess = () => {
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <Button onClick={() => {
        history.push("/SignUpPage")
      }}>
        SignUp
      </Button>
      <Button onClick={() => {
        history.push("/LoginPage")
      }}>
        Login
      </Button>
    </div>
  )
};

export default UserAccess;
