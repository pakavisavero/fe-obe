import {
  addMataKuliah,
  updateMataKuliah,
  clearResponse,
} from "src/store/apps/master/mataKuliah";
import FormData from "src/views/apps/FormData";
import axios from "src/configs/AxiosSetting";
import ContentForm from "src/views/apps/master/mata-kuliah/form/index";
import schema from "src/views/apps/master/mata-kuliah/yup";
import Translations from "src/layouts/components/Translations";
import { getCookie } from "cookies-next";
import { Modules } from "src/utils/token";

const Edit = ({ data }) => {
  const dataBreadcrumbs = [
    { name: "Master" },
    { name: "Mata Kuliah", link: "/apps/master/mata-kuliah/list" },
    { name: data.kode_mk },
  ];

  return (
    <FormData
      storeName={"mataKuliah"}
      urlData={"/apps/master/mata-kuliah/"}
      updateFunc={updateMataKuliah}
      saveFunc={addMataKuliah}
      yupSchema={schema}
      defaultValues={data}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      isEdit
      dataBreadcrumbs={dataBreadcrumbs}
      moduleName={Modules.MATA_KULIAH}
    />
  );
};

export const getServerSideProps = async ({ params, req, res }) => {
  try {
    const token = getCookie("token", { req, res });
    const response = await axios.get(`mata-kuliah/${params.id}`, {
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
          kurikulum_id_name: {
            name: response.data.data.kurikulum.name,
          },
          prodi_id_name: {
            prodi: response.data.data.prodi.prodi,
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
