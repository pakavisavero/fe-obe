import {
  addSiklusProdi,
  updateSiklusProdi,
  clearResponse,
  removeParams,
} from "src/store/apps/transaction/siklusProdi";

import FormData from "src/views/apps/FormDataMultipleChild";
import axios from "src/configs/AxiosSetting";
import ContentForm from "src/views/apps/transaction/siklus-prodi/form/index";
import schema from "src/views/apps/transaction/siklus-prodi/yup";

import { getCookie } from "cookies-next";
import { Modules } from "src/utils/token";

const Edit = ({ data }) => {
  const dataBreadcrumbs = [
    { name: "Main Menu" },
    { name: "Siklus Prodi", link: "/apps/transaction/siklus-prodi/list" },
    { name: data.name },
  ];

  return (
    <FormData
      storeName={"siklusProdi"}
      urlData={"/apps/transaction/siklus-prodi/"}
      updateFunc={updateSiklusProdi}
      saveFunc={addSiklusProdi}
      yupSchema={schema}
      defaultValues={data}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      dataBreadcrumbs={dataBreadcrumbs}
      isEdit
      withSave={false}
      withBack={false}
      moduleName={Modules.SIKLUS_PRODI}
    />
  );
};

export const getServerSideProps = async ({ params, req, res }) => {
  try {
    const token = getCookie("token", { req, res });
    const response = await axios.get(`siklus-prodi/${params.id}`, {
      headers: { token },
    });

    const option = await axios.get(`siklus-prodi/option`, {
      headers: { token },
    });

    if (response.data.code !== 200 && response.data.code !== 200) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        id: params?.id,
        data: {
          ...response.data.data,
          option: option.data.data,
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
