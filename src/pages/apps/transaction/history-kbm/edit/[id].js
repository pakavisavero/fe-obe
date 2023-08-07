import {
  addPerkuliahan,
  updatePerkuliahan,
  clearResponse,
  removeParams,
} from "src/store/apps/transaction/perkuliahan";
import FormData from "src/views/apps/FormDataMultipleChild";
import axios from "src/configs/AxiosSetting";
import ContentForm from "src/views/apps/transaction/history-kbm/form/index";
import schema from "src/views/apps/transaction/history-kbm/yup";
import Translations from "src/layouts/components/Translations";
import { getCookie } from "cookies-next";

const Edit = ({ data }) => {
  const dataBreadcrumbs = [
    { name: "Main Menu" },
    { name: "History KBM", link: "/apps/transaction/history-kbm/list" },
    {
      name:
        data.mata_kuliah_id_name.kode_mk +
        " - " +
        data.mata_kuliah_id_name.mata_kuliah,
    },
  ];

  return (
    <FormData
      storeName={"perkuliahan"}
      urlData={"/apps/transaction/history-kbm/"}
      updateFunc={updatePerkuliahan}
      saveFunc={addPerkuliahan}
      yupSchema={schema}
      defaultValues={data}
      ContentForm={ContentForm}
      clearResponse={clearResponse}
      isEdit
      dataBreadcrumbs={dataBreadcrumbs}
      withDocStatus
      withSave={false}
      withBack={false}
    />
  );
};

export const getServerSideProps = async ({ params, req, res }) => {
  try {
    const token = getCookie("token", { req, res });
    const response = await axios.get(`perkuliahan/${params.id}`, {
      headers: { token },
    });
    if (response.data.code !== 200) {
      return {
        notFound: true,
      };
    }

    const mahasiswaAfterLoop = response.data.data.mahasiswa.map((a, i) => ({
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
            mahasiswa: mahasiswaAfterLoop,
          },
          mata_kuliah_id_name: {
            kode_mk: response.data.data.mataKuliah.kode_mk,
            mata_kuliah: response.data.data.mataKuliah.mata_kuliah,
          },
          prodi_id_name: {
            prodi: response.data.data.prodi.prodi,
          },
          dosen1_id_name: {
            full_name: response.data.data.dosen1
              ? response.data.data.dosen1.full_name
              : "",
          },
          dosen2_id_name: {
            full_name: response.data.data.dosen2
              ? response.data.data.dosen2.full_name
              : "",
          },
          dosen3_id_name: {
            full_name: response.data.data.dosen3
              ? response.data.data.dosen3.full_name
              : "",
          },
          pj_dosen_id_name: {
            full_name: response.data.data.pjDosen.full_name,
          },
          tahun_ajaran_id_name: {
            tahun_ajaran: response.data.data.tahunAjaran.tahun_ajaran,
          },
          docstatus: response.data.data.docstatus.id,
          doc_status_id_name: {
            status: response.data.data.docstatus.status,
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
