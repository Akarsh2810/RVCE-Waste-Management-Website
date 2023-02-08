import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  layout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "18%",
   // border: "2px solid red",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));
export { useStyles };
