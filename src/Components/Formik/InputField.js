import { ErrorMessage } from "formik";
import TextError from "./TextError";
import { useStyles } from "./styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const InputField = (props) => {

  const classes = useStyles();
  const { label, name, inputlabel, onValueChange, ...rest } = props;

  return (
    <div className={classes.formField}>
      <FormControl>
        <InputLabel id={name} htmlFor={name}>
          {inputlabel}{" "}
          <ErrorMessage name={name} component={TextError}></ErrorMessage>
        </InputLabel>
        <Input
          id={name}
          labelid={name}
          name={name}
          {...rest}
          onChange={(event) => {
            onValueChange(event);
          }}
        ></Input>
      </FormControl>
    </div>
  );
};

export default InputField;
