import {
  addAssessmentProdi,
  updateAssessmentProdi,
  clearResponse,
} from "src/store/apps/transaction/assessmentProdi";

import FormData from "src/views/apps/FormDataMultipleChild";
import ContentForm from "src/views/apps/transaction/assessment-prodi/form/index";
import schema from "src/views/apps/transaction/assessment-prodi/yup";
import axios from "src/configs/AxiosSetting";

import { getCookie } from "cookies-next";
import { useAuth } from "src/hooks/useAuth";

const Add = ({ data }) => {
  const dataBreadcrumbs = [
    { name: "Main Menu" },
    {
      name: "Assessment Prodi",
      link: "/apps/transaction/assessment-prodi/list",
    },
    { name: "New Assessment Prodi" },
  ];

  const auth = useAuth();
  const defaultValues = {
    created_by: auth.user.fullName,
    data: data,
    siklus: [],
  };

  return (
    <FormData
      storeName={"assessmentProdi"}
      urlData={"/apps/transaction/assessment-prodi/"}
      updateFunc={updateAssessmentProdi}
      saveFunc={addAssessmentProdi}
      yupSchema={schema}
      defaultValues={defaultValues}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      dataBreadcrumbs={dataBreadcrumbs}
    />
  );
};

export const getServerSideProps = async ({ params, req, res }) => {
  try {
    const token = getCookie("token", { req, res });
    const response = await axios.get("siklus-prodis", {
      headers: { token },
    });

    if (response.data.code !== 200) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data: response.data.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Add;
