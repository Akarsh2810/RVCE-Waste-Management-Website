import { useStyles } from "./styles";
import Image from "../rvcelogo/rvceLogo.jpg";

const RVCEImage = () => {
  const classes = useStyles();
  return <div className={classes.layout}>
    <img src={Image} alt="logo"></img>
  </div>;
};
export default RVCEImage;
