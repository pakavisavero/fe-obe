import * as yup from 'yup'
const schema = yup.object().shape({
  module_name: yup.string().required("Module Name is a required field"),
  module_group_id: yup.number().required("Module Group is a required field").typeError('Module Group is not valid'),
  is_active: yup.string().required()
})

export default schema
