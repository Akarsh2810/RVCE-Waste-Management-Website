import React from "react";
import { useStyles } from "./styles";
import { Button } from "@material-ui/core";
import { Divider, Typography } from "@material-ui/core";
import DeletePost from "../DeletePost";
import axios from "axios";
import { getSessionToken, getUserMailId } from "../../utils/session";

const UserPosts = (props) => {
  const classes = useStyles();
  const userMailId = getUserMailId("userMailId");
  const config = {
    headers: {
      sessionId: getSessionToken("sessionId"),
    },
  };
  const { post } = props;
  return (
    <>
      <div className={classes.layout}>
        <Typography variant="subtitle2">{post?.postStatement}</Typography>
        <div className={classes.deletePost}>
          <div className={classes.layout}>
            <Button
              onClick={() => {
                const url = `http://localhost:8080/posts/${post?.id}/user/${userMailId}`;
                axios
                  .delete(url, config)
                  .then((data) => {
                    window.location.reload();
                  })
                  .catch((error) => {});
              }}
            >
              Delete Post
            </Button>
          </div>
        </div>
      </div>
      <Divider></Divider>
    </>
  );
};

export default UserPosts;
