import {
  addModule,
  updateModule,
  clearResponse,
} from "src/store/apps/setting/module";
import FormData from "src/views/apps/FormData";
import axios from "src/configs/AxiosSetting";
import ContentForm from "src/views/apps/setting/module/form/index";
import schema from "src/views/apps/setting/module/yup";
import Translations from "src/layouts/components/Translations";
import { getCookie } from "cookies-next";

const Edit = ({ data }) => {
  const dataBreadcrumbs = [
    { name: "Setting" },
    { name: "Module", link: "/apps/setting/module/list" },
    { name: data.module_name },
  ];

  return (
    <FormData
      storeName={"module"}
      urlData={"/apps/setting/module/"}
      updateFunc={updateModule}
      saveFunc={addModule}
      yupSchema={schema}
      defaultValues={data}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      isEdit
      dataBreadcrumbs={dataBreadcrumbs}
    />
  );
};

export const getServerSideProps = async ({ params, req, res }) => {
  try {
    const token = getCookie("token", { req, res });
    const response = await axios.get(`module/${params.id}`, {
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
          module_group_id_name: {
            module_name: response.data.data.moduleGroup
              ? response.data.data.moduleGroup.module_name
              : "",
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
