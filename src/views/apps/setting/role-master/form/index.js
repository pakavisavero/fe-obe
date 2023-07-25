import {
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Divider,
} from "@mui/material";

import { Controller } from "react-hook-form";
import { DrawField } from "src/utils/field";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import _ from "lodash";
import PermissionTab from "../Tab/PermissionTab";

const Index = ({ watch, store, control, errors, setValue, data }) => {
  const fields = [
    {
      name: "role_name",
      type: "text",
      label: "Role Name",
      xs: 12,
      md: 4,
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

      <Divider sx={{ mt: "30px", mb: "50px" }} />
      <PermissionTab
        watch={watch}
        store={store}
        control={control}
        errors={errors}
        setValue={setValue}
        data={data.children}
      />
    </CardContent>
  );
};

export default Index;
