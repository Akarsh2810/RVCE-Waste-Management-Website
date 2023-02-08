import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    position: "fixed",
    width: "100%",
    zIndex: 9999,
    background: "#000000",
    opacity: 0.5,
  },
}));

const Loader = ({ loading }) => {
  const classes = useStyles();
  if (loading)
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    );
  return null;
};

export default Loader;
