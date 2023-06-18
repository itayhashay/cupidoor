import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";

export const schema = Yup.object().shape({
  firstName: Yup.string().required("First name is a required field"),
  lastName: Yup.string().required("Last name is a required field"),
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
  phone: Yup.string().required("Phone number is a required field"),
  age: Yup.string().required("Age is a required field"),
  role: Yup.string().required("Role is a required field"),
});

export const roles = [
  { value: "landlord", label: "Landlord" },
  { value: "tenant", label: "Tenant" },
  { value: "both", label: "Both" },
];

export const CustomHelperText = styled(FormHelperText)({
  color: "red",
});

export const loginScheme = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string().required("Password is a required field"),
});



const wordCountValidator = (value: string | undefined) => {
  if(!value) return false;
  const wordCount = value.trim().split(/\s+/).length;
  return wordCount <= 120;
};

export const userDetailsScheme = Yup.object().shape({
  firstName: Yup.string().required("First name is a required field"),
  lastName: Yup.string().required("Last name is a required field"),
  age: Yup.number().required("Age is a required field").min(18,"You must be at least 18 years old!").max(120,"Please enter a valid age!"),
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  phone: Yup.string().required("Phone number is a required field"),
  description:Yup.string().test("description-max-word-count","Description must be a maximum of 120 words",wordCountValidator),
  role: Yup.string().required("Role is a required field"),
});
