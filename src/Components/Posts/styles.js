import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  () => ({
    layout: {
      border: "2px solid black",
      margin: "20px",
      borderRadius: "10px",
    },
  }),
  { index: 1 }
);

export { useStyles };
