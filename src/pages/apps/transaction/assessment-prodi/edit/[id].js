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

const Edit = ({ data }) => {
  const dataBreadcrumbs = [
    { name: "Transaction" },
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
    />
  );
};

export const getServerSideProps = async ({ params, req, res }) => {
  try {
    const token = getCookie("token", { req, res });
    const response = await axios.get(`assessment-prodi/${params.id}`, {
      headers: { token },
    });

    const siklus = await axios.get(`siklus-prodis`, {
      headers: { token },
    });

    if (response.data.code !== 200 && siklus.data.code !== 200) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data: {
          ...response.data.data,
          siklus: siklus.data.data,
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
