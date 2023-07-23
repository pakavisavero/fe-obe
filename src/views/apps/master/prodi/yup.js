import * as yup from 'yup'
const schema = yup.object().shape({
  prodi: yup.string().required("Program Studin is a required field"),
  fakultas_id: yup.number().required("Fakultas is a required field").typeError('Fakultas is not valid'),
})

export default schema
