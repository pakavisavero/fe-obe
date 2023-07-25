import * as yup from "yup";
const schema = yup.object().shape({
  kode_mk: yup.string().required("Kode MK is a required field"),
  mata_kuliah: yup.string().required("Mata Kuliah is a required field"),
  kurikulum_id: yup
    .number()
    .required("Kurikulum is a required field")
    .typeError("Kurikulum is not valid"),
  prodi_id: yup
    .number()
    .required("Program Studi is a required field")
    .typeError("Program Studi is not valid"),
  is_active: yup.bool().required(),
});

export default schema;
