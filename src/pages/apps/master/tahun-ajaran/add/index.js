import {
  addTahunAjaran,
  updateTahunAjaran,
  clearResponse,
} from "src/store/apps/master/tahunAjaran";
import FormData from "src/views/apps/FormData";
import ContentForm from "src/views/apps/master/tahun-ajaran/form/index";
import schema from "src/views/apps/master/tahun-ajaran/yup";

const defaultValues = {
  is_active: true,
};

const dataBreadcrumbs = [
  { name: "Master" },
  { name: "Tahun Ajaran", link: "/apps/master/tahun-ajaran/list" },
  { name: "New Tahun Ajaran" },
];

const Add = () => {
  return (
    <FormData
      storeName={"tahunAjaran"}
      urlData={"/apps/master/tahun-ajaran/"}
      updateFunc={updateTahunAjaran}
      saveFunc={addTahunAjaran}
      yupSchema={schema}
      defaultValues={defaultValues}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      dataBreadcrumbs={dataBreadcrumbs}
    />
  );
};

export default Add;
