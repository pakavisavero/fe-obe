import * as yup from "yup";
const schema = yup.object().shape({
  nip: yup
    .string()
    .required("NIP is a required field")
    .min(15, "NIP must be greater than 15 digits"),
  full_name: yup.string().required("Nama Lengkap is a required field"),
  username: yup
    .string()
    .required("Username is a required field")
    .typeError("Username is not valid"),
  email: yup
    .string()
    .email()
    .required("Email is a required field")
    .typeError("Email is not valid"),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Password must be 6 digits or greater!")
    .typeError("Password is not valid"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Confirm Password must match")
    .required("Confirm Password is required!")
    .typeError("Confirm Password is not valid"),
  prodi_id: yup
    .number()
    .required("Program Studi is a required field")
    .typeError("Program Studi is not valid"),
  is_active: yup.bool().required(),
});

export default schema;
