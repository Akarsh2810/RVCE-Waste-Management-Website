import { Typography } from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { getSessionToken, getUserMailId } from "../../utils/session";
import UserPosts from "../UserPosts";
import history from "../../Routes/history";
import { useStyles } from "./styles";

const YourPosts = () => {
  const classes = useStyles();
  const userMailId = getUserMailId("userMailId");
  const sessionId = getSessionToken("sessionId");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({});
  const reactOnSubmit = (values, formik) => {
    console.log("event post", values.description);
    const data = {
      postStatement: values?.description,
    };
    const config = {
      headers: {
        sessionId: getSessionToken("sessionId"),
      },
    };
    const uri = `http://localhost:8080/post/create/user/${userMailId}`;
    axios
      .post(uri, data, config)
      .then((data) => {
        console.log("post data", data);
        setNewPost(data);
      })
      .catch((error) => {});
  };
  const initialValues = {
    description: "",
  };
  // useEffect(() => {
  //   const uri = `http://localhost:8080/posts/user/${userMailId}`;
  //   const config = {
  //     headers: {
  //       sessionId: sessionId,
  //     },
  //   };
  //   axios
  //     .get(uri, config)
  //     .then((data) => {
  //       console.log("data ", data?.data);
  //       var postArray = data?.data;
  //       var reverseArray = postArray.slice().reverse();
  //       setPosts(reverseArray);
  //     })
  //     .catch((error) => {});
  // }, []);
  useEffect(() => {
    const uri = `http://localhost:8080/posts/user/${userMailId}`;
    const config = {
      headers: {
        sessionId: sessionId,
      },
    };
    axios
      .get(uri, config)
      .then((data) => {
        console.log("data ", data?.data);
        var postArray = data?.data;
        var reverseArray = postArray.reverse();
        setPosts(reverseArray);
      })
      .catch((error) => {});
  }, [newPost, sessionId, userMailId]);

  return (
    <>
      <div>
        <Formik initialValues={initialValues} onSubmit={reactOnSubmit}>
          {(formik) => (
            <Form>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Write your posts here"
                multiline
                minRows={1}
                maxRows={100}
                onChange={(event) => {
                  formik.setFieldValue("description", event.target.value);
                }}
              />
              <Button
                style={{ margin: "10px", border: "2px solid green" }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className={classes.layout}>
        <Typography variant="h5" style={{ padding: "10px" }}>
          Your Posts :-
        </Typography>
        {posts.map((post, index) => {
          return <UserPosts post={post} />;
        })}
      </div>
    </>
  );
};

export default YourPosts;
