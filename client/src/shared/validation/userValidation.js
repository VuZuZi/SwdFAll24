import * as yup from "yup";

//login validation
export const LoginValidation = yup.object().shape({
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .required("Passwrod is required.")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number"),
});
export const RegisterValidation = yup.object().shape({
  email: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .required("Passwrod is required.")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number"),
  name: yup
    .string()
    .required("Full name is required")
    .max(30, "Fullname is mus be lessthan 30 characters"),
  dob: yup
    .date()
    .nullable()
    .required("Birthdate is required")
    .max(new Date(), "Birthdate must be in the past"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Invalid phone number"),
  confirmPassword: yup
    .string()
    .required("password required")
    .oneOf(
      [yup.ref("password"), null],
      "New Password and Confirm password must match"
    ),
  term: yup.boolean().oneOf([true], "Term must be agree"),
});
export const ProfileValidation = yup.object().shape({
  name: yup
    .string()
    .required("Full name is required")
    .max(30, "Fullname is mus be lessthan 30 characters"),
  email: yup.string().email().required("Email is required").trim(),
});
export const PasswordValidation = yup.object().shape({
  oldPassword: yup
    .string()
    .required("password required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password mus be less than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must containt a number"),
  newPassword: yup
    .string()
    .required("password required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password mus be less than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must containt a number"),
  confirmPassword: yup
    .string()
    .required("password required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password mus be less than 20 characters")
    .matches(/(?=.*[0-9])/, "Password must containt a number")
    .oneOf(
      [yup.ref("newPassword"), null],
      "New Password and Confirm password must match"
    ),
});
