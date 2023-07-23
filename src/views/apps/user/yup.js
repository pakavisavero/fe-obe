import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required("Username is a required field"),
  email: yup
    .string()
    .email()
    .required("Email is a required field")
    .typeError("Email is not valid"),
  nip: yup
    .string()
    .required("NIP is a required field")
    .min(15, "NIP must be greater than 15 digits"),
});

export default schema;
