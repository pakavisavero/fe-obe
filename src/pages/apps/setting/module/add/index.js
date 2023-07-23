import { addMataKuliah, updateMataKuliah, clearResponse } from 'src/store/apps/master/mataKuliah'
import FormData from 'src/views/apps/FormData'
import ContentForm from 'src/views/apps/master/mata-kuliah/form/index'
import schema from 'src/views/apps/master/mata-kuliah/yup'

const defaultValues = {
  is_active: true,
}

const dataBreadcrumbs = [
  { name: 'Master' },
  { name: 'Mata Kuliah', link: '/apps/master/mata-kuliah/list' },
  { name: 'New Mata Kuliah' }
]

const Add = () => {
  return (
    <FormData
      storeName={'mataKuliah'}
      urlData={'/apps/master/mata-kuliah/'}
      updateFunc={updateMataKuliah}
      saveFunc={addMataKuliah}
      yupSchema={schema}
      defaultValues={defaultValues}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      dataBreadcrumbs={dataBreadcrumbs}
    />
  )
}

export default Add
