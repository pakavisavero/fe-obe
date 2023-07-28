import {
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { DrawField } from "src/utils/field";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { fetchData as fetchDataProdi } from "src/store/apps/master/prodi";
import { fetchData as fetchDataStatusMhs } from "src/store/apps/master/statusMahasiswa";
import { fetchData as fetchDataDosen } from "src/store/apps/master/dosen";
import _ from "lodash";

const Index = ({ control, errors, watch, setValue, setValueData }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState({
    prodi: false,
    doswal: false,
    status: false,
  });

  const handleOpen = (name) => () => {
    setOpen((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  const handleClose = (name) => () => {
    setOpen((prevState) => ({
      ...prevState,
      [name]: false,
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
    (state) => state.dosen
  );
  const { data: dataStatusMhs, loading: loadingStatusMhs } = useSelector(
    (state) => state.statusMahasiswa
  );

  const defaultParam = {
    is_active: true,
    is_dosen: true,
    is_paging: false,
  };

  useEffect(() => {
    dispatch(fetchDataProdi({ is_active: true }));
    dispatch(fetchDataStatusMhs({ is_active: true }));
    dispatch(fetchDataDosen({ is_active: true, is_dosen: true }));
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

    console.log(watch());

    if (nameSplit[0] == "prodi_id") {
      if (newValue) {
        dispatch(fetchDataDosen({ prodi_id: newValue.id }));
      } else {
        dispatch(fetchDataDosen());
      }

      setValueData("doswal_id_name", { ["full_name"]: "" });
      setValueData("doswal_id", "");
    }
  };

  const SearchhandleFilterAutoCompleteProdi = (e) => {
    var val = e.target.value;
    if (val.length > 0) {
      dispatch(
        fetchDataProdi({
          ...defaultParam,
          prodi: val,
        })
      );
    } else {
      dispatch(fetchDataProdi({ ...defaultParam }));
    }
  };

  const SearchhandleFilterAutoCompleteDosen = (e) => {
    var val = e.target.value;
    if (val.length > 0) {
      dispatch(
        fetchDataDosen({
          ...defaultParam,
          full_name: val,
        })
      );
    } else {
      dispatch(fetchDataDosen({ ...defaultParam }));
    }
  };

  const fields = [
    {
      name: "nim",
      type: "text",
      label: "NIM",
      xs: 12,
      md: 4,
    },
    {
      name: "full_name",
      type: "text",
      label: "Nama Lengkap",
      xs: 12,
      md: 4,
    },
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
      changeSearch: SearchhandleFilterAutoCompleteProdi,
      onChange: handleChangeAutoComplete("prodi_id_name", "prodi"),
    },
    {
      key: "doswal_id",
      name: "doswal_id_name",
      type: "autocomplete",
      label: "Dosen Wali",
      xs: 12,
      md: 4,
      data: _.sortBy(dataDosen, ["full_name"]),
      loading: loadingDosen,
      optLabel: "full_name",
      open: open.doswal,
      handleOpen: handleOpen("doswal"),
      handleClose: handleClose("doswal"),
      changeOpen: handleChangeOpen("doswal"),
      changeSearch: SearchhandleFilterAutoCompleteDosen,
      onChange: handleChangeAutoComplete("doswal_id_name", "full_name"),
    },

    {
      key: "status_mhs_id",
      name: "status_mhs_id_name",
      type: "autocomplete",
      label: "Status Mahasiswa",
      xs: 12,
      md: 4,
      data: _.sortBy(dataStatusMhs, ["status"]),
      loading: loadingStatusMhs,
      optLabel: "status",
      open: open.status,
      handleOpen: handleOpen("status"),
      handleClose: handleClose("status"),
      changeOpen: handleChangeOpen("status"),
      onChange: handleChangeAutoComplete("status_mhs_id_name", "prodi"),
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

  return (
    <CardContent>
      <Grid container spacing={3}>
        {fields.map((field, key) => DrawField(field, errors, control, key))}
      </Grid>
    </CardContent>
  );
};

export default Index;
