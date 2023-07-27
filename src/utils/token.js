import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

export const getToken = (arg) => {
  const token = getCookie("token");
  const decode_token = jwt.decode(token)[arg];
  return decode_token;
};

export const Modules = {
  DASHBOARD: 1,
  MAHASISWA: 2,
  DOSEN: 3,
  PROGRAM_STUDI: 4,
  MATA_KULIAH: 5,
  TAHUN_AJARAN: 6,
  LINK_MATA_KULIAH: 7,
  USERS: 8,
  MODULE: 9,
  ROLE_MASTER: 10,
  HISTORY_KBM: 11,
  KBM_AKTIF: 12,
  SIKLUS_PRODI: 13,
  ASSESSMENT_MATKUL: 14,
  ASSESSMENT_PRODI: 15,
};

export const Action = {
  VIEW: "view",
  ADD: "add",
  EDIT: "edit",
  EXPORT: "export",
  PRINT: "printt",
};

export const isAccessible = (access, module, action) => {
  console.log(module);
  console.log(access);

  const res = access.filter((acc) => acc[0].module_id === module)[0][0][
    "access"
  ][0][action];
  console.log(res);
  return res;
};
