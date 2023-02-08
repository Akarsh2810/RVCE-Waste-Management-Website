import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(
  () => ({
    errorRequired: {
      color: "red",
      paddingTop: "10px",
      fontSize: "0.8em",
      fontFamily: "Segoe UI, Segoe WP, Tahoma, Arial, sans-serif",
    },
    formCheckboxField: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: "1em",
    },
    formField: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
    },
    formDocumentField: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      paddingTop: "0.8em",
      paddingBottom: "0.5em",
    },
    formFieldOptions: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingBottom: "2em",
    },
    formFieldStateOptions: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      paddingBottom: "2em",
      width: "12em",
      "@media (max-width: 700px)": {
        width: "auto",
      },
    },
    formLabel: {
      fontWeight: "bold",
      fontSize: "1.1em",
      display: "flex",
    },
    formCheckboxLabel: {
      fontSize: "0.9em",
      marginBottom: "0.8em",
      marginLeft: "0.7em",
    },
    formOptionElement: {
      paddingBottom: "1em",
      fontSize: "1.1em",
      fontWeight: "bold",
      display: "flex",
      justifyContent: "flex-start",
    },
    formDocumentButtonFlex: {
      display: "flex",
      justifyContent: "flex-start",
      "@media (max-width: 500px)": {
        justifyContent: "center",
      },
    },
    formDocumentUploadButton: {
      backgroundColor: "#FFFFFF",
      color: "#000000",
      width: "20%",
      "@media (max-width: 650px)": {
        width: "30%",
      },
      "@media (max-width: 400px)": {
        width: "40%",
      },

      display: "flex",
      justifyContent: "space-around",
    },
    formDownloadFile: {
      display: "flex",
      justifyContent: "space-around",
      paddingTop: "1em",
      "@media (max-width: 700px)": {
        flexDirection: "column",
      },
    },
    formDownloadButton: {
      backgroundColor: "#F37320",
      color: "#FFFFFF",
      "@media (max-width: 700px)": {
        margin: "1em auto 1em",
      },
    },
    formUploadedFileName: {
      paddingLeft: "1em",
      paddingTop: "0.75em",
      fontSize: "0.8em",
    },
    publishIcon: {
      color: "#F37320",
      height: "1.125em",
      width: "1.125em",
    },
  }),
  { index: 1 }
);
export { useStyles };
