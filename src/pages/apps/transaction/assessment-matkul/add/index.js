import {
  addAssessmentMatkul,
  updateAssessmentMatkul,
  clearResponse,
} from "src/store/apps/transaction/assessmentMatkul";

import FormData from "src/views/apps/FormDataMultipleChild";
import ContentForm from "src/views/apps/transaction/assessment-matkul/form/index";
import schema from "src/views/apps/transaction/assessment-matkul/yup";
import axios from "src/configs/AxiosSetting";

import { getCookie } from "cookies-next";
import { useAuth } from "src/hooks/useAuth";

const Add = ({ data }) => {
  const dataBreadcrumbs = [
    { name: "Main Menu" },
    {
      name: "Assessment Matkul",
      link: "/apps/transaction/assessment-matkul/list",
    },
    { name: "New Assessment Matkul" },
  ];

  const auth = useAuth();
  const defaultValues = {
    created_by: auth.user.fullName,
    option: data,
    matkul: "",
    children: [],
  };

  return (
    <FormData
      storeName={"assessmentMatkul"}
      urlData={"/apps/transaction/assessment-matkul/"}
      updateFunc={updateAssessmentMatkul}
      saveFunc={addAssessmentMatkul}
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
    const response = await axios.get("assessment-matkul/option", {
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
