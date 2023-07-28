import {
  addProdi,
  updateProdi,
  clearResponse,
} from "src/store/apps/master/prodi";
import FormData from "src/views/apps/FormData";
import axios from "src/configs/AxiosSetting";
import ContentForm from "src/views/apps/master/prodi/form/index";
import schema from "src/views/apps/master/prodi/yup";
import Translations from "src/layouts/components/Translations";
import { getCookie } from "cookies-next";
import { Modules } from "src/utils/token";

const Edit = ({ data }) => {
  const dataBreadcrumbs = [
    { name: "Master" },
    { name: "Program Studi", link: "/apps/master/prodi/list" },
    { name: data.prodi },
  ];

  return (
    <FormData
      storeName={"prodi"}
      urlData={"/apps/master/prodi/"}
      updateFunc={updateProdi}
      saveFunc={addProdi}
      yupSchema={schema}
      defaultValues={data}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      isEdit
      dataBreadcrumbs={dataBreadcrumbs}
      moduleName={Modules.PROGRAM_STUDI}
    />
  );
};

export const getServerSideProps = async ({ params, req, res }) => {
  try {
    const token = getCookie("token", { req, res });
    const response = await axios.get(`prodi/${params.id}`, {
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
          fakultas_id_name: {
            nama_fakultas: response.data.data.fakultas.nama_fakultas,
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
