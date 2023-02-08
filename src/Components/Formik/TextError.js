import { useStyles } from "./styles";
const TextError = (props) => {
  const classes = useStyles();
  return <div className={classes.errorRequired}>{props.children}</div>;
};
export default TextError;
