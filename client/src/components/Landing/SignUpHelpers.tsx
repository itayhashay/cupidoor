import * as Yup from "yup";

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
