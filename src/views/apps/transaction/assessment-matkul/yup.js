import * as yup from 'yup'
const schema = yup.object().shape({
  name: yup.string().required('Nama Assessment is a required field!'),
  description: yup.string().required('Deskripsi is a required field!')
})

export default schema
