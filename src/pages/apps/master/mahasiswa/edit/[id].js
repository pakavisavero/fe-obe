import {
  addMahasiswa,
  updateMahasiswa,
  clearResponse,
} from "src/store/apps/master/mahasiswa";
import FormData from "src/views/apps/FormData";
import axios from "src/configs/AxiosSetting";
import ContentForm from "src/views/apps/master/mahasiswa/form/index";
import schema from "src/views/apps/master/mahasiswa/yup";
import Translations from "src/layouts/components/Translations";
import { getCookie } from "cookies-next";

const Edit = ({ data }) => {
  const dataBreadcrumbs = [
    { name: "Master" },
    { name: "Mahasiswa", link: "/apps/master/mahasiswa/list" },
    { name: data.full_name + " - " + data.nim },
  ];

  return (
    <FormData
      storeName={"mahasiswa"}
      urlData={"/apps/master/mahasiswa/"}
      updateFunc={updateMahasiswa}
      saveFunc={addMahasiswa}
      yupSchema={schema}
      defaultValues={data}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      isEdit
      dataBreadcrumbs={dataBreadcrumbs}
    />
  );
};

export const getServerSideProps = async ({ params, req, res }) => {
  try {
    const token = getCookie("token", { req, res });
    const response = await axios.get(`mahasiswa/${params.id}`, {
      headers: { token },
    });
    if (response.data.code !== 200) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        id: params?.id,
        data: {
          ...response.data.data,
          prodi_id_name: {
            prodi: response.data.data.prodi
              ? response.data.data.prodi.prodi
              : "",
          },
          status_mhs_id_name: {
            status: response.data.data.status
              ? response.data.data.status.status
              : "",
          },
          doswal_id_name: {
            full_name: response.data.data.doswal
              ? response.data.data.doswal.full_name
              : "",
          },
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Edit;
