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

const Index = ({ control, errors, setValue }) => {
  const dispatch = useDispatch();

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
      onChange: handleChangeAutoComplete(
        "mata_kuliah_id_name",
        "mata_kuliah",
        "kode_mk"
      ),
    },
    {
      key: "mapping_id",
      name: "mapping_id_name",
      type: "autocomplete",
      label: "Link To",
      xs: 12,
      md: 4,
      data: _.sortBy(dataMataKuliah, ["mata_kuliah"]),
      loading: loadingMataKuliah,
      optLabel: "kode_mk",
      optLabel2: "mata_kuliah",
      onChange: handleChangeAutoComplete(
        "mapping_id_name",
        "mata_kuliah",
        "kode_mk"
      ),
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
