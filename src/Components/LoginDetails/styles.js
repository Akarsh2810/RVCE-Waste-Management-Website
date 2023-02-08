import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(
  () => ({
    layout: {
      height: "60%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      padding: "0 30px",
    },
    submit: {
      display: "flex",
      justifyContent: "space-around",
    },
  }),
  { index: 1 }
);

export { useStyles };
