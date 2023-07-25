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
  Card,
} from "@mui/material";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MuiTab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";
import { Controller } from "react-hook-form";
import { DrawField } from "src/utils/field";
import { useDispatch, useSelector } from "react-redux";

import React, { useEffect, useState } from "react";

import _ from "lodash";

import DosenTab from "../Tab/DosenTab";
import PerkuliahanTab from "../Tab/PerkuliahanTab";
import MahasiswaTab from "../Tab/MahasiswaTab";

import AccountOutline from "mdi-material-ui/AccountOutline";
import AccountTieOutline from "mdi-material-ui/AccountTieOutline";
import MapMarkerOutline from "mdi-material-ui/MapMarkerOutline";

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 100,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 67,
  },
}));

const TabName = styled("span")(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: "0.875rem",
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Index = ({
  watch,
  control,
  store,
  errors,
  isEdit,
  setValue: setValueData,
}) => {
  const [value, setValue] = useState("dosen");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="account-settings tabs"
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value="dosen"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccountOutline />
                <TabName>Dosen</TabName>
              </Box>
            }
          />
          <Tab
            value="perkuliahan"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccountOutline />
                <TabName>Perkuliahan</TabName>
              </Box>
            }
          />
          <Tab
            value="mahasiswa"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccountOutline />
                <TabName>Perwalian</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value="dosen">
          <DosenTab
            watch={watch}
            control={control}
            errors={errors}
            setValue={setValue}
            setValueData={setValueData}
          />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="perkuliahan">
          <PerkuliahanTab
            watch={watch}
            store={store}
            control={control}
            errors={errors}
            setValueData={setValueData}
          />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value="mahasiswa">
          <MahasiswaTab
            watch={watch}
            store={store}
            control={control}
            errors={errors}
            setValueData={setValueData}
          />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default Index;
