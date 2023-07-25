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
import React, { useEffect, useState } from "react";

import _ from "lodash";

const Index = ({ control, errors, watch, setValue, isEdit }) => {
  const handleChangeName = (e) => {
    const name = e.target.value;
    if (name) {
      setValue("name", name.toString());
      setValue(
        "tahun_ajaran",
        name.toString() + "/" + (parseInt(name) + 1).toString()
      );
    } else {
      setValue("name", "");
      setValue("tahun_ajaran", "");
    }
  };

  const fields = [
    {
      name: "name",
      type: "number",
      label: "Nama",
      xs: 12,
      md: 4,
      onChange: (e) => handleChangeName(e),
      helperText: true,
      helperMessage: "[Hanya tahun, e.g. 2022]",
    },
    {
      name: "tahun_ajaran",
      type: "text",
      label: "Tahun Ajaran",
      xs: 12,
      md: 4,
      disabled: true,
    },
  ];

  if (isEdit) {
    fields.push({
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
    });
  }

  return (
    <CardContent>
      <Grid container spacing={3}>
        {fields.map((field, key) => DrawField(field, errors, control, key))}
      </Grid>
    </CardContent>
  );
};

export default Index;
