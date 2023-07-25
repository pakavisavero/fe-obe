import { getCookie } from "cookies-next";
import axios from "src/configs/AxiosSetting";

import FormData from "src/views/apps/FormDataMultipleChild";
import ContentForm from "src/views/apps/master/dosen/form/index";
import schema from "src/views/apps/master/dosen/yup";

import {
  addDosen,
  updateDosen,
  clearResponse,
} from "src/store/apps/master/dosen";

const Edit = ({ data }) => {
  const dataBreadcrumbs = [
    { name: "Master" },
    { name: "Dosen", link: "/apps/master/dosen/list" },
    { name: data.full_name },
  ];

  return (
    <FormData
      storeName={"dosen"}
      urlData={"/apps/master/dosen/"}
      updateFunc={updateDosen}
      saveFunc={addDosen}
      yupSchema={schema}
      defaultValues={data}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      dataBreadcrumbs={dataBreadcrumbs}
      isEdit
      withSave={false}
      withBack={false}
    />
  );
};

export const getServerSideProps = async ({ params, req, res }) => {
  try {
    const token = getCookie("token", { req, res });
    const response = await axios.get(`user/${params.id}`, {
      headers: { token },
    });
    if (response.data.code !== 200) {
      return {
        notFound: true,
      };
    }

    const perkuliahanAfterLoop = response.data.data.perkuliahan.map((a, i) => ({
      ...a,
      index: i,
      copyId: a.id,
    }));

    return {
      props: {
        id: params?.id,
        data: {
          ...{
            ...response.data.data,
            perkuliahan: perkuliahanAfterLoop,
          },
          prodi_id_name: {
            prodi: response.data.data.prodi.prodi,
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
