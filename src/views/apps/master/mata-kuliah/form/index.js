import { CardContent, Grid } from "@mui/material";
import { DrawField } from "src/utils/field";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import { fetchData as fetchDataKurikulum } from "src/store/apps/master/kurikulum";
import { fetchData as fetchDataProdi } from "src/store/apps/master/prodi";

import _ from "lodash";

const Index = ({ control, errors, setValue }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState({
    kurikulum: false,
    prodi: false,
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

  const { data: dataKurikulum, loading: loadingKurikulum } = useSelector(
    (state) => state.kurikulum
  );
  const { data: dataProdi, loading: loadingProdi } = useSelector(
    (state) => state.prodi
  );

  const defaultParam = {
    is_active: true,
    is_paging: false,
  };

  useEffect(() => {
    dispatch(fetchDataKurikulum({ is_active: true }));
    dispatch(fetchDataProdi({ is_active: true }));
  }, [dispatch]);

  const handleChangeAutoComplete = (name, opt) => (event, newValue) => {
    const nameSplit = name.split("_name");
    if (newValue) {
      setValue(name, newValue);
      setValue(nameSplit[0], newValue.id);
    } else {
      setValue(name, { [opt]: "" });
      setValue(nameSplit[0], "");
    }
  };

  const SearchhandleFilterAutoCompleteFakultas = (e) => {
    var val = e.target.value;
    if (val.length > 0) {
      dispatch(
        fetchDataFakultas({
          ...defaultParam,
          fakultas_name: val,
        })
      );
    } else {
      dispatch(fetchDataFakultas({ ...defaultParam }));
    }
  };

  const fields = [
    {
      name: "kode_mk",
      type: "text",
      label: "Kode MK",
      xs: 12,
      md: 4,
    },
    {
      name: "mata_kuliah",
      type: "text",
      label: "Mata Kuliah",
      xs: 12,
      md: 4,
    },
    {
      key: "kurikulum_id",
      name: "kurikulum_id_name",
      type: "autocomplete",
      label: "Kurikulum",
      xs: 12,
      md: 4,
      data: _.sortBy(dataKurikulum, ["name"]),
      loading: loadingKurikulum,
      optLabel: "name",
      open: open.kurikulum,
      handleOpen: handleOpen("kurikulum"),
      handleClose: handleClose("kurikulum"),
      changeOpen: handleChangeOpen("kurikulum"),
      onChange: handleChangeAutoComplete("kurikulum_id_name", "name"),
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
      onChange: handleChangeAutoComplete("prodi_id_name", "prodi"),
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
