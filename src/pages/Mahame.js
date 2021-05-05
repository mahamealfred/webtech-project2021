import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import Alert from "@material-ui/lab/Alert";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { signupAction } from "../redux/actions/signupAction";

const Mahame = () => {
  const navigate = useNavigate();
  const signup = useSelector((state) => state.signup);
  const dispatch = useDispatch();

  return (
    <>
     hello Mahame
    </>
  );
};

export default Mahame;
