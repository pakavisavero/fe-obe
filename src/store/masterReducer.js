import mahasiswa from "src/store/apps/master/mahasiswa";
import prodi from "src/store/apps/master/prodi";
import mataKuliah from "src/store/apps/master/mataKuliah";
import kurikulum from "src/store/apps/master/kurikulum";
import fakultas from "src/store/apps/master/fakultas";
import statusMahasiswa from "src/store/apps/master/statusMahasiswa";
import dosen from "src/store/apps/master/dosen";
import tahunAjaran from "src/store/apps/master/tahunAjaran";
import docstatusPk from "src/store/apps/master/docstatusPk";
import linkMataKuliah from "src/store/apps/master/linkMataKuliah";

const masterReducer = {
  mahasiswa,
  prodi,
  mataKuliah,
  kurikulum,
  fakultas,
  statusMahasiswa,
  dosen,
  tahunAjaran,
  docstatusPk,
  linkMataKuliah,
};

export default masterReducer;
