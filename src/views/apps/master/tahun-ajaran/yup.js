import * as yup from "yup";
const schema = yup.object().shape({
  name: yup.string().required("Nama is a required field"),
  is_active: yup.bool().required(),
});

export default schema;
