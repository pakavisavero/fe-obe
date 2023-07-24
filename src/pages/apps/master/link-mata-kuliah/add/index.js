import {
  addLinkMataKuliah,
  updateLinkMataKuliah,
  clearResponse,
} from "src/store/apps/master/linkMataKuliah";

import FormData from "src/views/apps/FormData";
import ContentForm from "src/views/apps/master/link-mata-kuliah/form/index";
import schema from "src/views/apps/master/link-mata-kuliah/yup";

const defaultValues = {
  is_active: true,
};

const dataBreadcrumbs = [
  { name: "Master" },
  { name: "Link Mata Kuliah", link: "/apps/master/link-mata-kuliah/list" },
  { name: "New Link Mata Kuliah" },
];

const Add = () => {
  return (
    <FormData
      storeName={"linkMataKuliah"}
      urlData={"/apps/master/link-mata-kuliah/"}
      updateFunc={updateLinkMataKuliah}
      saveFunc={addLinkMataKuliah}
      yupSchema={schema}
      defaultValues={defaultValues}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      dataBreadcrumbs={dataBreadcrumbs}
    />
  );
};

export default Add;
