import * as yup from "yup";
const schema = yup.object().shape({
  role_name: yup.string().required("Role Name is a required field"),
  is_active: yup.bool().required(),
});

export default schema;
