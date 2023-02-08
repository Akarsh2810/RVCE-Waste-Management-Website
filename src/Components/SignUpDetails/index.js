import { useState } from "react";
import { Box, Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import * as Yup from "yup";
import history from "../../Routes/history";
import FormikControl from "../Formik/FormikControl";
import { useStyles } from "./styles.js";
import { setSessionToken, setUserMailId } from "../../utils/session";

function Alert(props) {
  return <MuiAlert elevation={24} variant="filled" {...props} />;
}
const SignUpDetails = (props) => {
  const { setLoading } = props;
  const [validated, setValidated] = useState(null);
  const [openBodySnackBar, setOpenBodySnackBar] = useState(null);
  const initialValues = {
    fullName: "",
    emailId: "",
    password: "",
  };
  const validationSchema = Yup.object({
    fullName: Yup.string().required("*required"),
    emailId: Yup.string().required("*required"),
    password: Yup.string().required("*required"),
  });
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const handleBodySnackBarClose = () => {
    setOpenBodySnackBar(false);
  };
  const reactOnSubmit = (values, formik) => {
    setLoading(true);
    const url = `http://localhost:8080/user/create?fullName=${values.fullName}&emailId=${values.emailId}&password=${values.password}`;
    const data = {
      fullName: values.fullName,
      userMailId: values.emailId,
      password: values.password,
    };
    axios
      .post(url, data, config)
      .then((data) => {
        console.log("data", data);
        formik.resetForm();
        setOpenBodySnackBar(true);
        setValidated(true);
        setLoading(false);
        setSessionToken("sessionId", data?.data?.user?.sessionId);
        setUserMailId("userMailId", data?.data?.user?.userMailId);
        history.push("/HomePage");
      })
      .catch((error) => {
        setOpenBodySnackBar(true);
        setValidated(false);
        setLoading(false);
      });
  };

  const classes = useStyles();
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={reactOnSubmit}
      >
        {(formik) => (
          <Form className={classes.layout}>
            {openBodySnackBar ? (
              validated ? (
                <Snackbar
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  open={openBodySnackBar}
                  onClose={handleBodySnackBarClose}
                  key={"top" + "center"}
                >
                  <Alert onClose={handleBodySnackBarClose} severity="success">
                    Signed In successfully!
                  </Alert>
                </Snackbar>
              ) : (
                <Snackbar
                  anchorOrigin={{ vertical: "top", horizontal: "center" }}
                  open={openBodySnackBar}
                  onClose={handleBodySnackBarClose}
                  key={"top" + "center"}
                >
                  <Alert onClose={handleBodySnackBarClose} severity="error">
                    Enter RVCE Mail Id only
                  </Alert>
                </Snackbar>
              )
            ) : null}
            <Box>
              <FormikControl
                control="input"
                type="fullname"
                label="FULL NAME"
                name="fullName"
                inputlabel="Full Name"
                onValueChange={(event) => {
                  console.log("event", event);
                  console.log("window", window);
                  formik.setFieldValue("fullName", event.target.value);
                }}
                value={formik.values.fullName}
              ></FormikControl>
            </Box>
            <Box>
              <FormikControl
                control="input"
                type="email"
                label="EMAIL ID"
                name="emailId"
                inputlabel="Email"
                onValueChange={(event) => {
                  console.log("event", event);
                  console.log("window", window);
                  formik.setFieldValue("emailId", event.target.value);
                }}
                value={formik.values.emailId}
              ></FormikControl>
            </Box>
            <Box>
              <FormikControl
                control="input"
                type="password"
                label="PASSWORD"
                name="password"
                inputlabel="Password"
                onValueChange={(event) => {
                  formik.setFieldValue("password", event.target.value);
                }}
                value={formik.values.password}
              ></FormikControl>
            </Box>
            <Box className={classes.submit}>
              <Button
                variant="contained"
                type="submit"
                style={{
                  backgroundColor: "red",
                  color: "white",
                  fontWeight: "bold",
                  padding: "0.7em",
                  height: "100%",
                  width: "60%",
                }}
              >
                SIGNUP
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignUpDetails;
