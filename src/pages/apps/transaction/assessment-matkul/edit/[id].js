import {
  addAssessment,
  updateAssessment,
  clearResponse,
  removeParams,
} from "src/store/apps/transaction/assessmentMatkul";

import FormData from "src/views/apps/FormDataMultipleChild";
import axios from "src/configs/AxiosSetting";
import ContentForm from "src/views/apps/transaction/assessment-matkul/form/index";
import schema from "src/views/apps/transaction/assessment-matkul/yup";

import { getCookie } from "cookies-next";
import { Modules } from "src/utils/token";

const Edit = ({ data }) => {
  const dataBreadcrumbs = [
    { name: "Main Menu" },
    {
      name: "Assessment Matkul",
      link: "/apps/transaction/assessment-matkul/list",
    },
    { name: data.name },
  ];

  return (
    <FormData
      storeName={"assessmentMatkul"}
      urlData={"/apps/transaction/assessment-matkul/"}
      updateFunc={updateAssessment}
      saveFunc={addAssessment}
      yupSchema={schema}
      defaultValues={data}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      isEdit
      dataBreadcrumbs={dataBreadcrumbs}
      withSave={false}
      withBack={false}
      moduleName={Modules.ASSESSMENT_MATKUL}
    />
  );
};

export const getServerSideProps = async ({ params, req, res }) => {
  try {
    const token = getCookie("token", { req, res });
    const response = await axios.get(`assessment-matkul/${params.id}`, {
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
          ...{
            ...response.data.data,
            matkul:
              response.data.data.children[0].perkuliahan.mataKuliah.kode_mk +
              " - " +
              response.data.data.children[0].perkuliahan.mataKuliah.mata_kuliah,
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
