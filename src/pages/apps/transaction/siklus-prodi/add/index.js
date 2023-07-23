import {
  addSiklusProdi,
  updateSiklusProdi,
  clearResponse,
} from "src/store/apps/transaction/siklusProdi";

import FormData from "src/views/apps/FormDataMultipleChild";
import ContentForm from "src/views/apps/transaction/siklus-prodi/form/index";
import schema from "src/views/apps/transaction/siklus-prodi/yup";
import axios from "src/configs/AxiosSetting";

import { getCookie } from "cookies-next";
import { useAuth } from "src/hooks/useAuth";

const Add = ({ data }) => {
  const dataBreadcrumbs = [
    { name: "Transaction" },
    { name: "Siklus Prodi", link: "/apps/transaction/siklus-prodi/list" },
    { name: "New Siklus Prodi" },
  ];

  const auth = useAuth();
  const defaultValues = {
    created_by: auth.user.fullName,
    option: data,
    siklus: [],
  };

  return (
    <FormData
      storeName={"siklusProdi"}
      urlData={"/apps/transaction/siklus-prodi/"}
      updateFunc={updateSiklusProdi}
      saveFunc={addSiklusProdi}
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
    const response = await axios.get("siklus-prodi/option", {
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
