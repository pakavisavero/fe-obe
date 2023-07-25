import {
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Divider,
  Typography,
} from "@mui/material";

import { DrawField } from "src/utils/field";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

import { fetchDataOption as fetchDataProdi } from "src/store/apps/master/prodi";
import { fetchDataOption as fetchDataDosen } from "src/store/apps/setting/user";
import { fetchDataOption as fetchDataMataKuliah } from "src/store/apps/master/mataKuliah";
import { fetchDataOption as fetchDataTahunAjaran } from "src/store/apps/master/tahunAjaran";

import {
  fetchData,
  fetchDataByID,
  updatePerkuliahan,
  uploadDPNA,
  uploadCPMK,
  clearResponse,
} from "src/store/apps/transaction/perkuliahan";

import _ from "lodash";

import ImportDialog from "src/views/apps/ImportDialog";
import ImportDialogCPMK from "src/views/apps/ImportDialogCPMK";

import Import from "mdi-material-ui/Import";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

import axios from "src/configs/AxiosSetting";
import qs from "qs";
import ExportVariant from "mdi-material-ui/ExportVariant";
import toast from "react-hot-toast";

const PerkuliahanTab = ({
  watch,
  control,
  errors,
  isEdit,
  setValue,
  setValueData,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const token = getCookie("token");

  const store = useSelector((state) => state.perkuliahan);
  const { currentId, loading, message, error } = store;

  const { data: dataProdi, loading: loadingProdi } = useSelector(
    (state) => state.prodi
  );
  const { data: dataDosen, loading: loadingDosen } = useSelector(
    (state) => state.user
  );
  const { data: dataTahunAjaran, loading: loadingTahunAjaran } = useSelector(
    (state) => state.tahunAjaran
  );
  const { data: dataMataKuliah, loading: loadingMataKuiah } = useSelector(
    (state) => state.mataKuliah
  );

  const defaultParam = {
    is_active: true,
    is_paging: false,
  };

  useEffect(() => {
    dispatch(fetchDataProdi({ is_active: true }));
    dispatch(fetchDataDosen({ is_active: true }));
    dispatch(fetchDataMataKuliah({ is_active: true }));
    dispatch(fetchDataTahunAjaran({ is_active: true }));
  }, [dispatch]);

  const handleChangeAutoComplete = (name, opt) => (event, newValue) => {
    const nameSplit = name.split("_name");
    if (newValue) {
      setValueData(name, newValue);
      setValueData(nameSplit[0], newValue.id);
    } else {
      setValueData(name, { [opt]: "" });
      setValueData(nameSplit[0], "");
    }

    if (nameSplit[0] == "prodi_id") {
      if (newValue) {
        dispatch(fetchDataDosen({ prodi_id: newValue.id }));
        dispatch(fetchDataMataKuliah({ prodi_id: newValue.id }));
      } else {
        setValueData("mata_kuliah_id_name", { ["mata_kuliah"]: "" });
        setValueData("mata_kuliah_id", "");
        setValueData("dosen1_id_name", { ["full_name"]: "" });
        setValueData("dosen1_id", "");
        setValueData("dosen2_id_name", { ["full_name"]: "" });
        setValueData("dosen2_id", "");
        setValueData("dosen3_id_name", { ["full_name"]: "" });
        setValueData("dosen3_id", "");
        setValueData("pj_dosen_id_name", { ["full_name"]: "" });
        setValueData("pj_dosen_id", "");
      }
    }

    if (nameSplit[0] == "dosen1_id") {
      if (!newValue) {
        setValueData("dosen2_id_name", { ["full_name"]: "" });
        setValueData("dosen2_id", "");
        setValueData("dosen3_id_name", { ["full_name"]: "" });
        setValueData("dosen3_id", "");
        setValueData("pj_dosen_id_name", { ["full_name"]: "" });
        setValueData("pj_dosen_id", "");
      }
    }

    if (nameSplit[0] == "dosen2_id") {
      if (!newValue) {
        setValueData("dosen3_id_name", { ["full_name"]: "" });
        setValueData("dosen3_id", "");
      }
    }
  };

  const SearchhandleFilterAutoComplete = (opt, func) => (e) => {
    var val = e.target.value;
    if (val.length > 0) {
      dispatch(
        func({
          ...defaultParam,
          [opt]: val,
        })
      );
    } else {
      dispatch(func({ ...defaultParam }));
    }
  };

  const getPJDosen = () => {
    return dataDosen.filter(
      (item) =>
        item.id === watch("dosen1_id") ||
        item.id === watch("dosen2_id") ||
        item.id === watch("dosen3_id")
    );
  };

  const fields = [
    {
      key: "prodi_id",
      name: "prodi_id_name",
      type: "autocomplete",
      label: "Program Studi",
      xs: 12,
      md: 4,
      data: _.sortBy(dataProdi, ["prodi"]),
      loading: loadingProdi,
      optLabel: "prodi",
      changeSearch: SearchhandleFilterAutoComplete("prodi", fetchDataProdi),
      onChange: handleChangeAutoComplete("prodi_id_name", "prodi"),
      disabled: isEdit ? true : false,
    },
    {
      key: "mata_kuliah_id",
      name: "mata_kuliah_id_name",
      type: "autocomplete",
      label: "Mata Kuliah",
      xs: 12,
      md: 4,
      data: _.sortBy(watch("prodi_id") ? dataMataKuliah : [], ["mata_kuliah"]),
      loading: loadingMataKuiah,
      optLabel: "kode_mk",
      optLabel2: "mata_kuliah",
      changeSearch: SearchhandleFilterAutoComplete(
        "mata_kuliah",
        fetchDataMataKuliah
      ),
      onChange: handleChangeAutoComplete("mata_kuliah_id_name", "mata_kuliah"),
      disabled: isEdit ? true : false,
    },
    {
      key: "dosen1_id",
      name: "dosen1_id_name",
      type: "autocomplete",
      label: "Dosen I",
      xs: 12,
      md: 4,
      data: _.sortBy(watch("prodi_id") ? dataDosen : [], ["full_name"]),
      loading: loadingDosen,
      optLabel: "full_name",
      changeSearch: SearchhandleFilterAutoComplete("full_name", fetchDataDosen),
      onChange: handleChangeAutoComplete("dosen1_id_name", "full_name"),
    },
    {
      key: "dosen2_id",
      name: "dosen2_id_name",
      type: "autocomplete",
      label: "Dosen II",
      xs: 12,
      md: 4,
      data: _.sortBy(
        watch("dosen1_id")
          ? dataDosen.filter((item) => item.id != watch("dosen1_id"))
          : [],
        ["full_name"]
      ),
      loading: loadingDosen,
      optLabel: "full_name",
      changeSearch: SearchhandleFilterAutoComplete("full_name", fetchDataDosen),
      onChange: handleChangeAutoComplete("dosen2_id_name", "full_name"),
    },
    {
      key: "dosen3_id",
      name: "dosen3_id_name",
      type: "autocomplete",
      label: "Dosen III",
      xs: 12,
      md: 4,
      data: _.sortBy(
        watch("dosen2_id")
          ? dataDosen.filter(
              (item) =>
                item.id != watch("dosen1_id") && item.id != watch("dosen2_id")
            )
          : [],
        ["full_name"]
      ),
      loading: loadingDosen,
      optLabel: "full_name",
      changeSearch: SearchhandleFilterAutoComplete("full_name", fetchDataDosen),
      onChange: handleChangeAutoComplete("dosen3_id_name", "full_name"),
    },
    {
      key: "pj_dosen_id",
      name: "pj_dosen_id_name",
      type: "autocomplete",
      label: "PJ Dosen",
      xs: 12,
      md: 4,
      data: _.sortBy(watch("prodi_id") ? getPJDosen() : [], ["full_name"]),
      loading: loadingDosen,
      optLabel: "full_name",
      changeSearch: SearchhandleFilterAutoComplete("full_name", fetchDataDosen),
      onChange: handleChangeAutoComplete("pj_dosen_id_name", "full_name"),
    },
    {
      name: "kelas",
      type: "text",
      label: "Kelas",
      xs: 12,
      md: 4,
    },
    {
      key: "tahun_ajaran_id",
      name: "tahun_ajaran_id_name",
      type: "autocomplete",
      label: "Tahun Ajaran",
      xs: 12,
      md: 4,
      data: _.sortBy(dataTahunAjaran, ["tahun_ajaran"]),
      loading: loadingTahunAjaran,
      optLabel: "tahun_ajaran",
      onChange: handleChangeAutoComplete(
        "tahun_ajaran_id_name",
        "tahun_ajaran"
      ),
    },
    {
      name: "semester",
      type: "select",
      label: "Semester",
      xs: 12,
      md: 4,
      opt: [
        {
          value: "Gasal",
          label: "Gasal",
        },
        {
          value: "Genap",
          label: "Genap",
        },
      ],
    },
    {
      name: "is_active",
      type: "select",
      label: "Status",
      xs: 12,
      md: 4,
      opt: [
        {
          value: true,
          label: "Active",
        },
        {
          value: false,
          label: "Inactive",
        },
      ],
    },
  ];

  const refreshMahasiswa = async () => {
    const response = await axios.get(`perkuliahan/${id}`);
    setValueData("mahasiswa", response.data.data.mahasiswa);
  };

  const [open, setOpen] = useState({
    dpna: false,
    cpmk: false,
  });

  const handleClose = (name) => () => {
    setOpen((prevState) => ({
      ...prevState,
      [name]: false,
    }));
  };

  const handleOpen = (name) => () => {
    setOpen((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  const handleDownload = () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}get-template/${id}`);
  };

  const handleDownloadSIAP = () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}get-form-siap/${id}`);
  };

  const handleOpenPortofolio = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}get-portofolio/${id}`,
      "_blank"
    );
  };

  return (
    <>
      {isEdit && (
        <>
          <CardContent>
            <Grid container>
              {watch("docstatus") == 3 && (
                <Button
                  Button
                  sx={{ mr: 4, fontSize: 12 }}
                  color="secondary"
                  variant="outlined"
                  startIcon={<ExportVariant fontSize="small" />}
                  onClick={handleDownloadSIAP}
                >
                  Get DPNA SIAP
                </Button>
              )}

              {watch("docstatus") == 3 && (
                <Button
                  Button
                  sx={{ mr: 4, fontSize: 12 }}
                  color="secondary"
                  variant="outlined"
                  startIcon={<ExportVariant fontSize="small" />}
                  onClick={handleOpenPortofolio}
                >
                  Get Portofolio
                </Button>
              )}
            </Grid>
          </CardContent>
          {watch("docstatus") == 3 && <Divider />}
        </>
      )}

      <CardContent>
        <Grid container spacing={3}>
          {fields.map((field, key) => DrawField(field, errors, control, key))}
        </Grid>
      </CardContent>
    </>
  );
};

export default PerkuliahanTab;
