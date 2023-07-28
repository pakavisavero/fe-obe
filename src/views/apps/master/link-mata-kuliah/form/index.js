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

import { DrawField } from "src/utils/field";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchData as fetchDataMataKuliah } from "src/store/apps/master/mataKuliah";

import _ from "lodash";

const Index = ({ control, errors, setValue, isEdit, watch, reset }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState({
    mataKuliah: false,
    mapping: false,
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

  const { data: dataMataKuliah, loading: loadingMataKuliah } = useSelector(
    (state) => state.mataKuliah
  );

  useEffect(() => {
    dispatch(fetchDataMataKuliah());
  }, [dispatch]);

  const handleChangeAutoComplete = (name, opt, opt2) => (event, newValue) => {
    const nameSplit = name.split("_name");
    if (newValue) {
      setValue(name, newValue);
      setValue(nameSplit[0], newValue.id);
    } else {
      setValue(name, null);
      setValue(nameSplit[0], "");
    }

    if (nameSplit[0] == "mata_kuliah_id") {
      if (!newValue) {
        reset({ mapping_id: undefined });
      }
    }
  };

  const fields = [
    {
      key: "mata_kuliah_id",
      name: "mata_kuliah_id_name",
      type: "autocomplete",
      label: "Mata Kuliah",
      xs: 12,
      md: 4,
      data: _.sortBy(dataMataKuliah, ["mata_kuliah"]),
      loading: loadingMataKuliah,
      optLabel: "kode_mk",
      optLabel2: "mata_kuliah",
      open: open.mataKuliah,
      handleOpen: handleOpen("mataKuliah"),
      handleClose: handleClose("mataKuliah"),
      changeOpen: handleChangeOpen("mataKuliah"),
      onChange: handleChangeAutoComplete(
        "mata_kuliah_id_name",
        "mata_kuliah",
        "kode_mk"
      ),
      disabled: isEdit ? true : false,
    },
    {
      key: "mapping_id",
      name: "mapping_id_name",
      type: "autocomplete",
      label: "Link To",
      xs: 12,
      md: 4,
      data: _.sortBy(
        watch("mata_kuliah_id")
          ? dataMataKuliah.filter((item) => item.id != watch("mata_kuliah_id"))
          : [],
        ["mata_kuliah"]
      ),
      loading: loadingMataKuliah,
      optLabel: "kode_mk",
      optLabel2: "mata_kuliah",
      open: open.mapping,
      handleOpen: handleOpen("mapping"),
      handleClose: handleClose("mapping"),
      changeOpen: handleChangeOpen("mapping"),
      onChange: handleChangeAutoComplete(
        "mapping_id_name",
        "mata_kuliah",
        "kode_mk"
      ),
      disabled: isEdit ? true : false,
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
