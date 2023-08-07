import {
  addAssessmentProdi,
  updateAssessmentProdi,
  clearResponse,
  removeParams,
} from "src/store/apps/transaction/assessmentProdi";

import FormData from "src/views/apps/FormDataMultipleChild";
import axios from "src/configs/AxiosSetting";
import ContentForm from "src/views/apps/transaction/assessment-prodi/form/index";
import schema from "src/views/apps/transaction/assessment-prodi/yup";

import { getCookie } from "cookies-next";
import { Modules } from "src/utils/token";

const Edit = ({ data }) => {
  const dataBreadcrumbs = [
    { name: "Main Menu" },
    {
      name: "Assessment Prodi",
      link: "/apps/transaction/assessment-prodi/list",
    },
    { name: data.name },
  ];

  return (
    <FormData
      storeName={"assessmentProdi"}
      urlData={"/apps/transaction/assessment-prodi/"}
      updateFunc={updateAssessmentProdi}
      saveFunc={addAssessmentProdi}
      yupSchema={schema}
      defaultValues={data}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      isEdit
      dataBreadcrumbs={dataBreadcrumbs}
      withSave={false}
      withBack={false}
      moduleName={Modules.ASSESSMENT_PRODI}
    />
  );
};

export const getServerSideProps = async ({ params, req, res }) => {
  try {
    const token = getCookie("token", { req, res });
    const response = await axios.get(`assessment-prodi/${params.id}`, {
      headers: { token },
    });

    if (response.data.code !== 200) {
      return {
        notFound: true,
      };
    }

    const siklusAfterLoop = response.data.data.children.map((a, i) => ({
      ...a,
      index: i,
      copyId: a.id,
    }));

    return {
      props: {
        data: {
          ...response.data.data,
          siklus: siklusAfterLoop,
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
