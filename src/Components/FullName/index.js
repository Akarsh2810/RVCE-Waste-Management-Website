import { Typography } from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";

const UserAccess = (props) => {
  const {fullName} = props;
  const classes = useStyles();
  return (
    <div className={classes.layout}>
      <Typography variant="subtitle2">
      {fullName}
      </Typography>
    </div>
  )
};

export default UserAccess;
