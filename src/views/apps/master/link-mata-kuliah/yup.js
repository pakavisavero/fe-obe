import * as yup from "yup";

const schema = yup.object().shape({
  mata_kuliah_id: yup
    .number()
    .required("Mata Kuliah is a required field!")
    .typeError("Mata Kuliah is a not valid!"),
  mapping_id: yup
    .number()
    .required("Link To is a required field!")
    .typeError("Link To is a not valid!"),
});

export default schema;
