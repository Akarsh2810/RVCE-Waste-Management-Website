import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(
  () => ({
    layout: {
      backgroundColor: "#6577B3",
      width: "40%",
    },
    root: {
      fontWeight: "medium",
      fontSize: "1.25em",
      color: "#6F6F6P",
      letterSpacing: "0px",
    },
    signin: {
      position: "absolute",
      bottom: "15.625em",
      right: "40%",
      height: "31.875em",
      width: "25em",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      "@media (max-width: 1400px),(max-height: 800px)": {
        position: "absolute",
        bottom: "5.625em",
        right: "40%",
        height: "27.875em",
        width: "22em",
      },
      "@media (min-height: 1400px)": {
        position: "absolute",
        bottom: "25.625em",
        right: "40%",
        height: "35.875em",
        width: "28em",
      },
    },
    signintext: {
      height: "16%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    },
  }),
  { index: 1 }
);

export { useStyles };
