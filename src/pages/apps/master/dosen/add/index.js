import FormData from "src/views/apps/FormData";
import ContentForm from "src/views/apps/master/dosen/form/index";
import schema from "src/views/apps/master/dosen/yup";

import {
  addDosen,
  updateDosen,
  clearResponse,
} from "src/store/apps/master/dosen";

const defaultValues = {
  is_active: true,
};

const dataBreadcrumbs = [
  { name: "Master" },
  { name: "Dosen", link: "/apps/master/dosen/list" },
  { name: "New Dosen" },
];

const Add = () => {
  return (
    <FormData
      storeName={"dosen"}
      urlData={"/apps/master/dosen/"}
      updateFunc={updateDosen}
      saveFunc={addDosen}
      yupSchema={schema}
      defaultValues={defaultValues}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      dataBreadcrumbs={dataBreadcrumbs}
    />
  );
};

export default Add;
