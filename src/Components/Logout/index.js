import React from "react";
import { useStyles } from "./styles";
import { Button } from "@material-ui/core";
import axios from "axios";
import { getSessionToken, removeSessionToken, getUserMailId, removeUserMailId } from "../../utils/session";
import history from "../../Routes/history";

const Logout = (props) => {
  const userMailId = getUserMailId("userMailId")
  const classes = useStyles();
  const reactOnSubmit = () => {
    const config = {
      headers: {
        sessionId: getSessionToken("sessionId"),
      },
    };
    axios
      .post(`http://localhost:8080/user/${userMailId}/logout`, null, config)
      .then((data) => {
        removeSessionToken("sessionId");
        removeUserMailId("userMailId");
        history.push("/");
      })
      .catch((error) => {});
  };
  return (
    <div className={classes.layout}>
      <Button onClick={reactOnSubmit}>Logout</Button>
    </div>
  );
};

export default Logout;
