import * as yup from "yup";

const schema = yup.object().shape({
  old_password: yup
    .string()
    .required("Old Password is a required field!")
    .min(6, "Old Password must be 6 digits or greater!"),
  new_password: yup
    .string()
    .required("New Password is a required field!")
    .min(6, "New Password must be 6 digits or greater!"),
  confirm_new_password: yup
    .string()
    .required("Confirm New Password is a required field!")
    .oneOf([yup.ref("new_password"), null], "Confirm New Password must match")
    .min(6, "Confirm New Password must be 6 digits or greater!"),
});

export default schema;
