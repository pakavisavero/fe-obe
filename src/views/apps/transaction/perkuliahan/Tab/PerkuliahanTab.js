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
  Backdrop,
  CircularProgress,
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

  const [open, setOpen] = useState({
    dpna: false,
    cpmk: false,
    prodi: false,
    mataKuliah: false,
    dosen1: false,
    dosen2: false,
    dosen3: false,
    pjDosen: false,
    tahunAjaran: false,
    semester: false,
  });

  const [backdrop, setBackdrop] = useState(false);

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

  const handleChangeOpen = (name) => () => {
    setOpen((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

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
        setValueData("mata_kuliah_id_name", {
          ["kode_mk"]: "",
          ["mata_kuliah"]: "",
        });
        setValueData("mata_kuliah_id", "");
        setValueData("dosen_id_name", { ["full_name"]: "" });
        setValueData("dosen_id", "");
        setValueData("dosen2_id_name", { ["full_name"]: "" });
        setValueData("dosen2_id", "");
        setValueData("dosen3_id_name", { ["full_name"]: "" });
        setValueData("dosen3_id", "");
        setValueData("pj_dosen_id_name", { ["full_name"]: "" });
        setValueData("pj_dosen_id", "");
      }
    }

    if (nameSplit[0] == "dosen_id") {
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
        item.id === watch("dosen_id") ||
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
      open: open.prodi,
      handleOpen: handleOpen("prodi"),
      handleClose: handleClose("prodi"),
      changeOpen: handleChangeOpen("prodi"),
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
      optLabel: "mata_kuliah",
      // optLabel2: "mata_kuliah",
      open: open.mataKuliah,
      handleOpen: handleOpen("mataKuliah"),
      handleClose: handleClose("mataKuliah"),
      changeOpen: handleChangeOpen("mataKuliah"),
      changeSearch: SearchhandleFilterAutoComplete(
        "mata_kuliah",
        fetchDataMataKuliah
      ),
      onChange: handleChangeAutoComplete("mata_kuliah_id_name", "mata_kuliah"),
      disabled: isEdit || !watch("prodi_id") ? true : false,
    },
    {
      key: "dosen_id",
      name: "dosen_id_name",
      type: "autocomplete",
      label: "Dosen I",
      xs: 12,
      md: 4,
      data: _.sortBy(watch("prodi_id") ? dataDosen : [], ["full_name"]),
      loading: loadingDosen,
      optLabel: "full_name",
      open: open.dosen1,
      handleOpen: handleOpen("dosen1"),
      handleClose: handleClose("dosen1"),
      changeOpen: handleChangeOpen("dosen1"),
      changeSearch: SearchhandleFilterAutoComplete("full_name", fetchDataDosen),
      onChange: handleChangeAutoComplete("dosen_id_name", "full_name"),
      disabled: !watch("prodi_id") ? true : false,
    },
    {
      key: "dosen2_id",
      name: "dosen2_id_name",
      type: "autocomplete",
      label: "Dosen II",
      xs: 12,
      md: 4,
      data: _.sortBy(
        watch("dosen_id")
          ? dataDosen.filter((item) => item.id != watch("dosen_id"))
          : [],
        ["full_name"]
      ),
      loading: loadingDosen,
      optLabel: "full_name",
      open: open.dosen2,
      handleOpen: handleOpen("dosen2"),
      handleClose: handleClose("dosen2"),
      changeOpen: handleChangeOpen("dosen2"),
      changeSearch: SearchhandleFilterAutoComplete("full_name", fetchDataDosen),
      onChange: handleChangeAutoComplete("dosen2_id_name", "full_name"),
      disabled: !watch("dosen_id") ? true : false,
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
                item.id != watch("dosen_id") && item.id != watch("dosen2_id")
            )
          : [],
        ["full_name"]
      ),
      loading: loadingDosen,
      optLabel: "full_name",
      open: open.dosen3,
      handleOpen: handleOpen("dosen3"),
      handleClose: handleClose("dosen3"),
      changeOpen: handleChangeOpen("dosen3"),
      changeSearch: SearchhandleFilterAutoComplete("full_name", fetchDataDosen),
      onChange: handleChangeAutoComplete("dosen3_id_name", "full_name"),
      disabled: !watch("dosen2_id") ? true : false,
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
      open: open.pjDosen,
      handleOpen: handleOpen("pjDosen"),
      handleClose: handleClose("pjDosen"),
      changeOpen: handleChangeOpen("pjDosen"),
      changeSearch: SearchhandleFilterAutoComplete("full_name", fetchDataDosen),
      onChange: handleChangeAutoComplete("pj_dosen_id_name", "full_name"),
      disabled: !watch("prodi_id") ? true : false,
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
      open: open.tahunAjaran,
      handleOpen: handleOpen("tahunAjaran"),
      handleClose: handleClose("tahunAjaran"),
      changeOpen: handleChangeOpen("tahunAjaran"),
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

  const callbackImportDPNA = async (dataFile) => {
    if (dataFile.length > 1) {
      const dataRequest = {
        data: dataFile,
        id: watch("id"),
      };

      dispatch(uploadDPNA(dataRequest)).then((res) => {
        if (!res.error) {
          axios.get(`get-template/${id}`);
          router.reload();
        }
      });
    } else {
      toast.error("File empty");
    }
  };

  const callbackImportCPMK = async (dataFile) => {
    if (dataFile.length > 1) {
      const dataRequest = {
        data: dataFile,
        id: watch("id"),
      };

      dispatch(uploadCPMK(dataRequest))
        .then((res) => {
          console.log(res);
          if (!res.error) {
            router.reload();
          }
        })
        .catch((err) => {
          toast.error("Failed to upload CPMK!");
        });
    } else {
      toast.error("File empty");
    }
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
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backdrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          <CardContent>
            <Grid container>
              <ImportDialog
                callback={callbackImportDPNA}
                openDialog={open.dpna}
                handleClose={handleClose("dpna")}
                handleOpenDialog={() => setBackdrop(true)}
                handleCloseDialog={() => setBackdrop(false)}
              />
              <ImportDialogCPMK
                callback={callbackImportCPMK}
                openDialog={open.cpmk}
                handleClose={handleClose("cpmk")}
                handleOpenDialog={() => setBackdrop(true)}
                handleCloseDialog={() => setBackdrop(false)}
                id={watch("id")}
              />

              {watch("docstatus") === 1 && watch("docstatus") !== 3 && (
                <Button
                  sx={{ fontSize: 12, mr: 3 }}
                  color="secondary"
                  variant="outlined"
                  startIcon={<Import fontSize="small" />}
                  onClick={handleOpen("dpna")}
                >
                  Import DPNA
                </Button>
              )}
              {watch("docstatus") != 1 && watch("docstatus") !== 3 && (
                <>
                  <Button
                    sx={{ mr: 4, fontSize: 12 }}
                    color="secondary"
                    variant="outlined"
                    startIcon={<ExportVariant fontSize="small" />}
                    onClick={handleDownload}
                  >
                    Get Template CPMK
                  </Button>

                  <Button
                    sx={{ fontSize: 12, mr: 3 }}
                    color="secondary"
                    variant="outlined"
                    startIcon={<Import fontSize="small" />}
                    onClick={handleOpen("cpmk")}
                  >
                    Import CPMK
                  </Button>
                </>
              )}
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
          <Divider />
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
