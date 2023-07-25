import {
  addRoleMaster,
  updateRoleMaster,
  clearResponse,
} from "src/store/apps/setting/roleMaster";

import FormData from "src/views/apps/FormDataMultipleChild";
import ContentForm from "src/views/apps/setting/role-master/form/index";
import schema from "src/views/apps/setting/role-master/yup";

import axios from "src/configs/AxiosSetting";
import { getCookie } from "cookies-next";

const defaultValues = {
  is_active: true,
};

const dataBreadcrumbs = [
  { name: "Setting" },
  { name: "Role Master", link: "/apps/setting/role-master/list" },
  { name: "New Role Master" },
];

const Add = () => {
  return (
    <FormData
      storeName={"roleMaster"}
      urlData={"/apps/setting/role-master/"}
      updateFunc={updateRoleMaster}
      saveFunc={addRoleMaster}
      yupSchema={schema}
      defaultValues={defaultValues}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      dataBreadcrumbs={dataBreadcrumbs}
    />
  );
};

export const getServerSideProps = async ({ params, req, res }) => {
  // try {
  const token = getCookie("token", { req, res });
  const response = await axios.get(`role-/${params.id}`, {
    headers: { token },
  });
  if (response.data.code !== 200) {
    return {
      notFound: true,
    };
  }

  const dataAfterLoop = response.data.data.permissions.map((a, i) => ({
    ...a,
    index: i,
    module_name: a.module.module_name,
    module_group_name: a.module.moduleGroup.module_name,
    copyId: a.id,
  }));

  return {
    props: {
      id: params?.id,
      data: {
        ...{ ...response.data.data, children: dataAfterLoop.sort() },
      },
    },
  };
  // } catch (error) {
  //   return {
  //     notFound: true,
  //   };
  // }
};

export default Add;
