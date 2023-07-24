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

import _ from "lodash";

import ImportDialog from "src/views/apps/ImportDialog";
import ImportDialogCPMK from "src/views/apps/ImportDialogCPMK";

import Import from "mdi-material-ui/Import";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

import axios from "src/configs/AxiosSetting";
import qs from "qs";
import ExportVariant from "mdi-material-ui/ExportVariant";

// ** MUI Imports
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useFieldArray } from "react-hook-form";

// ** Icons Imports
import ChevronDown from "mdi-material-ui/ChevronDown";

const CPMKTab = ({
  watch,
  control,
  errors,
  isEdit,
  setValue,
  setValueData,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const store = useSelector((state) => state.perkuliahan);
  const { currentId, loading, message, error } = store;

  const [expanded, setExpanded] = useState(false);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "cpmk",
  });

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {fields.map((item) => {
        return (
          <CardContent CardContent>
            <Grid container spacing={3}>
              <Accordion
                expanded={expanded === `panel-${item.id}`}
                onChange={handleChange(`panel-${item.id}`)}
                sx={{ width: "100%" }}
              >
                <AccordionSummary
                  expandIcon={<ChevronDown />}
                  id="controlled-panel-header-1"
                  aria-controls="controlled-panel-content-1"
                  sx={{ height: "70px" }}
                >
                  <Typography>
                    <Box
                      component="div"
                      sx={{ display: "inline", fontWeight: "bold" }}
                    >
                      [{item.name}]
                    </Box>{" "}
                    - {item.statement}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Divider sx={{ mb: "25px", mt: "0px" }} />
                  {item.cpl.map((cpl, id) => (
                    <>
                      <Box
                        component="div"
                        sx={{ display: "inline", color: "blue" }}
                      >
                        {cpl.name} ({cpl.value})
                      </Box>
                      <Typography sx={{ marginTop: "10px" }}>
                        {cpl.statement}
                      </Typography>
                      {id + 1 != item.cpl.length && (
                        <Divider sx={{ mb: "10px", mt: "20px" }} />
                      )}
                    </>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Grid>
          </CardContent>
        );
      })}
    </>
  );
};

export default CPMKTab;
