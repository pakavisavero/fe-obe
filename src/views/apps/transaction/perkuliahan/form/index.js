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

import { styled } from "@mui/material/styles";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MuiTab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import React, { useEffect, useState, Component } from "react";

import _ from "lodash";

import PerkuliahanTab from "../Tab/PerkuliahanTab";
import CPMKTab from "../Tab/CPMKTab";
import MahasiswaTab from "../Tab/MahasiswaTab";
import EvaluasiTab from "../Tab/EvaluasiTab";
import StatistikTab from "../Tab/StatistikTab";

import AccountOutline from "mdi-material-ui/AccountOutline";
import ChartDonut from "mdi-material-ui/ChartDonut";
import FileDocumentOutline from "mdi-material-ui/FileDocumentOutline";
import ArchiveOutline from "mdi-material-ui/ArchiveOutline";
import MessageOutline from "mdi-material-ui/MessageOutline";

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
  const [value, setValue] = useState("perkuliahan");

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
            value="perkuliahan"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ArchiveOutline />
                <TabName>Perkuliahan</TabName>
              </Box>
            }
          />
          {watch("docstatus") == 3 && isEdit && (
            <Tab
              value="cpmk"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FileDocumentOutline />
                  <TabName>CPMK</TabName>
                </Box>
              }
            />
          )}
          {watch("docstatus") != 1 && isEdit && (
            <Tab
              value="mahasiswa"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccountOutline />
                  <TabName>Mahasiswa</TabName>
                </Box>
              }
            />
          )}
          {watch("docstatus") == 3 && isEdit && (
            <Tab
              value="statistik"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ChartDonut />
                  <TabName>Statistik</TabName>
                </Box>
              }
            />
          )}
          {watch("docstatus") == 3 && isEdit && (
            <Tab
              value="evaluasi"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <MessageOutline />
                  <TabName>Evaluasi</TabName>
                </Box>
              }
            />
          )}
        </TabList>

        <TabPanel sx={{ p: 0 }} value="perkuliahan">
          <PerkuliahanTab
            watch={watch}
            isEdit={isEdit}
            control={control}
            errors={errors}
            setValue={setValue}
            setValueData={setValueData}
          />
        </TabPanel>
        {watch("docstatus") == 3 && isEdit && (
          <TabPanel sx={{ p: 0 }} value="cpmk">
            <CPMKTab
              watch={watch}
              control={control}
              errors={errors}
              setValue={setValue}
              setValueData={setValueData}
            />
          </TabPanel>
        )}
        {watch("docstatus") != 1 && isEdit && (
          <TabPanel sx={{ p: 0 }} value="mahasiswa">
            <MahasiswaTab
              watch={watch}
              store={store}
              control={control}
              errors={errors}
              setValueData={setValueData}
            />
          </TabPanel>
        )}
        {watch("docstatus") == 3 && isEdit && (
          <TabPanel sx={{ p: 0 }} value="statistik">
            <StatistikTab
              watch={watch}
              store={store}
              control={control}
              errors={errors}
              setValueData={setValueData}
            />
          </TabPanel>
        )}
        {watch("docstatus") == 3 && isEdit && (
          <TabPanel sx={{ p: 0 }} value="evaluasi">
            <EvaluasiTab
              watch={watch}
              store={store}
              control={control}
              errors={errors}
              setValueData={setValueData}
            />
          </TabPanel>
        )}
      </TabContext>
    </Card>
  );
};

export default Index;
