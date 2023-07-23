import { addProdi, updateProdi, clearResponse } from 'src/store/apps/master/prodi'
import FormData from 'src/views/apps/FormData'
import ContentForm from 'src/views/apps/master/prodi/form/index'
import schema from 'src/views/apps/master/prodi/yup'

const defaultValues = {
  is_active: true,
}

const dataBreadcrumbs = [
  { name: 'Master' },
  { name: 'Program Studi', link: '/apps/master/prodi/list' },
  { name: 'New Program Studi' }
]

const Add = () => {
  return (
    <FormData
      storeName={'prodi'}
      urlData={'/apps/master/prodi/'}
      updateFunc={updateProdi}
      saveFunc={addProdi}
      yupSchema={schema}
      defaultValues={defaultValues}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      dataBreadcrumbs={dataBreadcrumbs}
    />
  )
}

export default Add
