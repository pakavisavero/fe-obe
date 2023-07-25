import {
  addUser,
  updateUser,
  clearResponse,
} from "src/store/apps/setting/user";

import FormData from "src/views/apps/FormDataMultipleChild";
import ContentForm from "src/views/apps/setting/user/form/index";
import schema from "src/views/apps/setting/user/yup";

const defaultValues = {
  is_active: true,
  roles: [],
};

const dataBreadcrumbs = [
  { name: "Setting" },
  { name: "User", link: "/apps/setting/user/list" },
  { name: "New User" },
];

const Add = () => {
  return (
    <FormData
      storeName={"user"}
      urlData={"/apps/setting/user/"}
      updateFunc={updateUser}
      saveFunc={addUser}
      yupSchema={schema}
      defaultValues={defaultValues}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      dataBreadcrumbs={dataBreadcrumbs}
    />
  );
};

export default Add;
