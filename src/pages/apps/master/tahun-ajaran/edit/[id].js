import { addTahunAjaran, updateTahunAjaran, clearResponse } from 'src/store/apps/master/tahunAjaran'
import FormData from 'src/views/apps/FormData'
import axios from 'src/configs/AxiosSetting'
import ContentForm from 'src/views/apps/master/tahun-ajaran/form/index'
import schema from 'src/views/apps/master/tahun-ajaran/yup'
import Translations from 'src/layouts/components/Translations'
import { getCookie } from 'cookies-next'


const Edit = ({ data }) => {
  const dataBreadcrumbs = [
    { name: 'Master' },
    { name: 'Tahun Ajaran', link: '/apps/master/tahun-ajaran/list' },
    { name: data.tahun_ajaran }
  ]

  return (
    <FormData
      storeName={'tahunAjaran'}
      urlData={'/apps/master/tahun-ajaran/'}
      updateFunc={updateTahunAjaran}
      saveFunc={addTahunAjaran}
      yupSchema={schema}
      defaultValues={data}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      isEdit
      dataBreadcrumbs={dataBreadcrumbs}
    />
  )
}

export const getServerSideProps = async ({ params, req, res }) => {
  try {
    const token = getCookie('token', { req, res })
    const response = await axios.get(`tahun-ajaran/${params.id}`, { headers: { token } })
    if (response.data.code !== 200) {
      return {
        notFound: true
      }
    }
    return {
      props: {
        id: params?.id,
        data: {
          ...response.data.data,
        }
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}


export default Edit
