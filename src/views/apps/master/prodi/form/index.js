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

import { fetchData as fetchDataFakultas } from "src/store/apps/master/fakultas";
import _ from "lodash";

const Index = ({ control, errors, setValue }) => {
  const dispatch = useDispatch();

  const { data: dataFakultas, loading: loadingFakultas } = useSelector(
    (state) => state.fakultas
  );

  const defaultParam = {
    is_active: true,
    is_paging: false,
  };

  useEffect(() => {
    dispatch(fetchDataFakultas({ is_active: true, is_paging: false }));
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

  const fields = [
    {
      name: "prodi",
      type: "text",
      label: "Program Studi",
      xs: 12,
      md: 4,
    },
    {
      key: "fakultas_id",
      name: "fakultas_id_name",
      type: "autocomplete",
      label: "Fakultas",
      xs: 12,
      md: 4,
      data: _.sortBy(dataFakultas, ["nama_fakultas"]),
      loading: loadingFakultas,
      optLabel: "nama_fakultas",
      onChange: handleChangeAutoComplete("fakultas_id_name", "nama_fakultas"),
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
