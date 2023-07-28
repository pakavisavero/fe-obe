import {
  addLinkMataKuliah,
  updateLinkMataKuliah,
  clearResponse,
} from "src/store/apps/master/linkMataKuliah";

import FormData from "src/views/apps/FormData";
import axios from "src/configs/AxiosSetting";
import ContentForm from "src/views/apps/master/link-mata-kuliah/form/index";
import schema from "src/views/apps/master/link-mata-kuliah/yup";
import Translations from "src/layouts/components/Translations";
import { getCookie } from "cookies-next";
import { Modules } from "src/utils/token";

const Edit = ({ data }) => {
  const dataBreadcrumbs = [
    { name: "Master" },
    { name: "Link Mata Kuliah", link: "/apps/master/link-mata-kuliah/list" },
    { name: data.mataKuliah.kode_mk + " - " + data.mataKuliah.mata_kuliah },
  ];

  return (
    <FormData
      storeName={"linkMataKuliah"}
      urlData={"/apps/master/link-mata-kuliah/"}
      updateFunc={updateLinkMataKuliah}
      saveFunc={addLinkMataKuliah}
      yupSchema={schema}
      defaultValues={data}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      dataBreadcrumbs={dataBreadcrumbs}
      isEdit
      withSave={false}
      withBack={false}
      moduleName={Modules.LINK_MATA_KULIAH}
    />
  );
};

export const getServerSideProps = async ({ params, req, res }) => {
  try {
    const token = getCookie("token", { req, res });
    const response = await axios.get(`link-mata-kuliah/${params.id}`, {
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
          mata_kuliah_id_name: {
            kode_mk: response.data.data.mataKuliah.kode_mk,
            mata_kuliah: response.data.data.mataKuliah.mata_kuliah,
          },
          mapping_id_name: {
            kode_mk: response.data.data.mapping.kode_mk,
            mata_kuliah: response.data.data.mapping.mata_kuliah,
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
