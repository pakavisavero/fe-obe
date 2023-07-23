import * as yup from 'yup'
const schema = yup.object().shape({
  nim: yup.string().required("NIM is a required field"),
  full_name: yup.string().required("Nama Lengkap is a required field"),
  doswal_id: yup.number().required("Dosen Wali is a required field").typeError('Dosen Wali is not valid'),
  prodi_id: yup.number().required("Program Studi is a required field").typeError('Program Studi is not valid'),
  status_mhs_id: yup.number().required("Status Mahasiswa is a required field").typeError('Status Mahasiswa is not valid'),
  is_active: yup.string().required()
})

export default schema
