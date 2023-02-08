import { TextField, Button } from "@material-ui/core";
import React from "react";
import { Formik, Form } from "formik";
import { useStyles } from "./styles";
import axios from "axios";
import { getSessionToken, getUserMailId } from "../../utils/session";
import history from "../../Routes/history";

const NewPost = () => {
  const classes = useStyles();
  const userMailId = getUserMailId('userMailId')
  
 
  const reactOnSubmit = (values,formik) => {
    console.log('event post',values.description)
    const data = {
      'postStatement':values?.description
    }
    const config ={
      headers:{
        'sessionId': getSessionToken('sessionId')
      }
    }
    const uri = `http://localhost:8080/post/create/user/${userMailId}`
    axios.post(uri,data,config).then((data)=>{
      console.log('post data',data)     
      history.push('/HomePage') 
    }).catch((error)=>{})
  };
  const initialValues = {
    description:""
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={reactOnSubmit}
      >
        {(formik) => (
          <Form>
           <TextField
        fullWidth
        variant="outlined"
        placeholder="Write your posts here"
        multiline
        minRows={1}
        maxRows={100}
        onChange={(event)=>{
          formik.setFieldValue("description",event.target.value)
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
  );
};

export default NewPost;
