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
} from "@mui/material";

import { Controller } from "react-hook-form";
import { DrawField } from "src/utils/field";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import _ from "lodash";
import Permission from "../child/permission";

const PermissionTab = ({
  watch,
  store,
  control,
  errors,
  isEdit,
  setValue,
  data,
}) => {
  return (
    <Permission
      control={control}
      store={store}
      data={data}
      setValue={setValue}
    />
  );
};

export default PermissionTab;
