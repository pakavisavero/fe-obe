import * as yup from 'yup'
const schema = yup.object().shape({
  mata_kuliah_id: yup.number().required("Mata Kuliah is a required field").typeError('Mata Kuliah is not valid'),
  dosen1_id: yup.number().required("Dosen I is a required field").typeError('Dosen I is not valid'),
  dosen2_id: yup.number().required("Dosen II is a required field").typeError('Dosen II is not valid'),
  pj_dosen_id: yup.number().required("PJ Dosen is a required field").typeError('PJ Dosen is not valid'),
  prodi_id: yup.number().required("Program Studi is a required field").typeError('Program Studi is not valid'),
  tahun_ajaran_id: yup.number().required("Tahun Ajaran is a required field").typeError('Tahun Ajaran is not valid'),
  kelas: yup.string().required("Kelas is a required field"),
  semester: yup.string().required("Semester is a required field"),
  is_active: yup.string().required()
})

export default schema
