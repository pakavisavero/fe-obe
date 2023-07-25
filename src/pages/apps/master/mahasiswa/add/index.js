import {
  addMahasiswa,
  updateMahasiswa,
  clearResponse,
} from "src/store/apps/master/mahasiswa";

import FormData from "src/views/apps/FormData";
import ContentForm from "src/views/apps/master/mahasiswa/form/index";
import schema from "src/views/apps/master/mahasiswa/yup";

const defaultValues = {
  is_active: true,
};

const dataBreadcrumbs = [
  { name: "Master" },
  { name: "Mahasiswa", link: "/apps/master/mahasiswa/list" },
  { name: "New Mahasiswa" },
];

const Add = () => {
  return (
    <FormData
      storeName={"mahasiswa"}
      urlData={"/apps/master/mahasiswa/"}
      updateFunc={updateMahasiswa}
      saveFunc={addMahasiswa}
      yupSchema={schema}
      defaultValues={defaultValues}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      dataBreadcrumbs={dataBreadcrumbs}
    />
  );
};

export default Add;
