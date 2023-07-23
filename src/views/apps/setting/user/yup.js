import * as yup from 'yup'
const schema = yup.object().shape({
  nip: yup.string().required("NIP is a required field"),
  full_name: yup.string().required("Nama Lengkap is a required field"),
  username: yup.string().required("Username is a required field"),
  password: yup.string().required("Password is a required field"),
  password_confirmation: yup.string().required("Password Confirmation is a required field"),
  prodi_id: yup.number().required("Program Studi is a required field").typeError('Program Studi is not valid'),
  is_active: yup.string().required()
})

export default schema
