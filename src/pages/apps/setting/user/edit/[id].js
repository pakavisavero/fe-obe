import { addUser, updateUser, clearResponse } from 'src/store/apps/setting/user'
import FormData from 'src/views/apps/FormData'
import axios from 'src/configs/AxiosSetting'
import ContentForm from 'src/views/apps/setting/user/form/index'
import schema from 'src/views/apps/setting/user/yup'
import Translations from 'src/layouts/components/Translations'
import { getCookie } from 'cookies-next'


const Edit = ({ data }) => {
  const dataBreadcrumbs = [
    { name: 'Setting' },
    { name: 'User', link: '/apps/setting/user/list' },
    { name: data.full_name }
  ]

  return (
    <FormData
      storeName={'user'}
      urlData={'/apps/setting/user/'}
      updateFunc={updateUser}
      saveFunc={addUser}
      yupSchema={schema}
      defaultValues={data}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      dataBreadcrumbs={dataBreadcrumbs}
      isEdit
    />
  )
}

export const getServerSideProps = async ({ params, req, res }) => {
  try {
    const token = getCookie('token', { req, res })
    const response = await axios.get(`user/${params.id}`, { headers: { token } })
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
          prodi_id_name: {
            prodi: response.data.data.prodi.prodi
          }
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