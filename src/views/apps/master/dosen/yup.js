import * as yup from 'yup'
const schema = yup.object().shape({
  nip: yup.string().required("NIP is a required field"),
  full_name: yup.string().required("Nama Lengkap is a required field"),
  prodi_id: yup.number().required("Fakultas is a required field").typeError('Fakultas is not valid'),
})

export default schema
