import { Typography } from "@material-ui/core";
import React from "react";
import RVCEImage from "../RVCEImage";
import { useStyles } from "./styles";
import Logout from "../Logout";
import UserAccess from "../UserAccess";
import _ from "lodash";
import { getSessionToken } from "../../utils/session";

const Header = () => {
  const classes = useStyles();
  const sessionId = _.isEmpty(getSessionToken("sessionId"));

  return (
    <div className={classes.layout}>
      <RVCEImage></RVCEImage>
      <div className={classes.text}>
        <Typography variant="h3">R V College of Engineering<sup>®</sup></Typography>
        <Typography variant="h5" align="center">Waste Management App</Typography>
      </div>
      {sessionId ? <UserAccess></UserAccess> : <Logout></Logout>}
    </div>
  );
};

export default Header;
