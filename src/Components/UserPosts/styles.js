import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  layout: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    border: "2px solid grey",
    margin: "10px",
    padding: "10px",
    borderRadius: "10px",
  },
  deletePost: {
    display: "flex",
    flexDirection: "row",
  }
}));
export { useStyles };
