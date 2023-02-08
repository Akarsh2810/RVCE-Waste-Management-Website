import { ErrorMessage } from "formik";
import TextError from "./TextError";
import { useStyles } from "./styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const TextAreaField = (props) => {

  const classes = useStyles();
  const { label, name, onValueChange, ...rest } = props;

  return (
    <div className={classes.formField}>
      <InputLabel htmlFor={name} className={classes.formLabel}>
        {label}
      </InputLabel>
      <Input
        as="textarea"
        id={name}
        name={name}
        {...rest}
        className={classes.formElement}
        style={{
          fontFamily: "Segoe UI, Segoe WP, Tahoma, Arial, sans-serif",
          height: "20%",
          paddingBottom: "2%",
          fontSize: "18px",
        }}
        onChange={(event) => {
          onValueChange(event);
        }}
      />
      <ErrorMessage
        name={name}
        component={TextError}
        className={classes.formElement}
      />
    </div>
  );
};

export default TextAreaField;
