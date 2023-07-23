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
  Box,
} from "@mui/material";

import { Controller } from "react-hook-form";
import { DrawField } from "src/utils/field";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import _ from "lodash";
import RaportCpl from "../child/raportCPl";

const RaportCplTab = ({
  watch,
  store,
  control,
  errors,
  isEdit,
  setValue,
  data,
  labels,
}) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <CardContent sx={{ padding: 10 }}>
      <RaportCpl
        control={control}
        store={store}
        watch={watch}
        data={data}
        labels={labels}
      />
    </CardContent>
  );
};

export default RaportCplTab;
