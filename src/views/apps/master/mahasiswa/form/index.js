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
import { styled } from "@mui/material/styles";
import MuiTab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import React, { useEffect, useState } from "react";

import _ from "lodash";

import PerkuliahanTab from "../Tab/PerkuliahanTab";
import MahasiswaTab from "../Tab/MahasiswaTab";
import RaportCplTab from "../Tab/RaportCplTab";

// ** Icons Imports
import AccountOutline from "mdi-material-ui/AccountOutline";
import ChartDonut from "mdi-material-ui/ChartDonut";
import FileDocumentOutline from "mdi-material-ui/FileDocumentOutline";

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
  const [value, setValue] = useState("mahasiswa");

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
            value="mahasiswa"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccountOutline />
                <TabName>Mahasiswa</TabName>
              </Box>
            }
          />
          {isEdit && (
            <Tab
              value="cpl"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ChartDonut />
                  <TabName>CPL</TabName>
                </Box>
              }
            />
          )}
          {isEdit && (
            <Tab
              value="raport"
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FileDocumentOutline />
                  <TabName>Raport</TabName>
                </Box>
              }
            />
          )}
        </TabList>

        <TabPanel sx={{ p: 0 }} value="mahasiswa">
          <MahasiswaTab
            watch={watch}
            control={control}
            errors={errors}
            setValue={setValue}
            setValueData={setValueData}
          />
        </TabPanel>
        {isEdit && (
          <TabPanel sx={{ p: 0 }} value="cpl">
            <RaportCplTab
              watch={watch}
              data={watch("raportCpl")}
              labels={watch("labels")}
              store={store}
              control={control}
              errors={errors}
              setValueData={setValueData}
            />
          </TabPanel>
        )}
        {isEdit && (
          <TabPanel sx={{ p: 0 }} value="raport">
            <PerkuliahanTab
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
