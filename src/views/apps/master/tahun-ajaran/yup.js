import * as yup from 'yup'
const schema = yup.object().shape({
  tahun_ajaran: yup.string().required("Tahun Ajaran is a required field"),
  is_active: yup.string().required()
})

export default schema
