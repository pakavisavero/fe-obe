import { addPerkuliahan, updatePerkuliahan, clearResponse } from 'src/store/apps/transaction/perkuliahan'
import FormData from 'src/views/apps/FormData'
import ContentForm from 'src/views/apps/transaction/perkuliahan/form/index'
import schema from 'src/views/apps/transaction/perkuliahan/yup'

const defaultValues = {
  semester: 'Gasal',
  is_active: true,
}

const dataBreadcrumbs = [
  { name: 'Tranasction' },
  { name: 'Perkuliahan', link: '/apps/transaction/perkuliahan/list' },
  { name: 'New Perkuliahan' }
]

const Add = () => {
  return (
    <FormData
      storeName={'perkuliahan'}
      urlData={'/apps/transaction/perkuliahan/'}
      updateFunc={updatePerkuliahan}
      saveFunc={addPerkuliahan}
      yupSchema={schema}
      defaultValues={defaultValues}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      dataBreadcrumbs={dataBreadcrumbs}
    />
  )
}

export default Add
