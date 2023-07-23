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
  Button,
  CircularProgress,
  Box,
  Menu,
  Typography,
  Card,
  CardHeader,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import { useDispatch, useSelector } from "react-redux";

import { DrawField } from "src/utils/field";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ChevronDown from "mdi-material-ui/ChevronDown";

import Tooltip from "@mui/material/Tooltip";

const DialogMahasiswa = ({ open, close, data }) => {
  const dispatch = useDispatch();

  const dataMahasiswa = [
    ["Nama Lengkap", data.full_name],
    ["NIM", data.nim],
    ["Nilai Praktek", data.raport.nilai_pokok.nilai_praktek],
    ["Nilai Tugas", data.raport.nilai_pokok.nilai_tugas.toFixed(2)],
    ["Nilai UTS", data.raport.nilai_pokok.nilai_uts.toFixed(2)],
    ["Nilai UAS", data.raport.nilai_pokok.nilai_uas.toFixed(2)],
    ["Nilai Akhir", data.raport.nilai_pokok.nilai_akhir.toFixed(2)],
    ["NA (Huruf)", data.raport.nilai_pokok.nilai_akhir_huruf],
    ["Keterangan", data.raport.nilai_pokok.keterangan, true],
  ];

  const elementNilai = [
    ["cpmkMhs", "Total Nilai CPMK", true],
    ["tugas", "Nilai Tugas", false],
    ["uts", "Nilai UTS", false],
    ["uas", "Nilai UAS", false],
    ["praktek", "Nilai Praktek", false],
  ];

  const getColorNilai = (nilai) => {
    if (nilai === "Lulus") {
      return "green";
    } else if (nilai === "Remidi CPMK") {
      return "orange";
    } else if (nilai === "Tidak Lulus") {
      return "red";
    }
  };

  const getColorCPMK = (nilai) => {
    if (nilai < 60) {
      return ["red", "Remidi"];
    } else {
      return ["green", "Lulus"];
    }
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={open}
      onClose={close}
      aria-labelledby="form-dialog-content"
    >
      <DialogTitle id="form-dialog-title">Informasi Mahasiswa</DialogTitle>
      <DialogContent id="form-dialog-content">
        <Divider />
        {dataMahasiswa.map((mhs) => {
          return (
            <>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography>{mhs[0]}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography>:</Typography>
                </Grid>
                <Grid item xs={8}>
                  {mhs[2] ? (
                    <Typography>
                      <Button
                        style={{ maxHeight: "25px", borderRadius: "15px" }}
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: getColorNilai(mhs[1]) }}
                      >
                        {mhs[1]}
                      </Button>
                    </Typography>
                  ) : (
                    mhs[1]
                  )}
                </Grid>
              </Grid>
              <Divider />
            </>
          );
        })}
        <Grid sx={{ marginTop: "30px" }} />

        {elementNilai.map((el) => {
          return (
            <Accordion
              sx={{
                width: "100%",
                marginTop: "15px",
              }}
            >
              <AccordionSummary
                expandIcon={<ChevronDown backgroundColor="white" />}
                id="controlled-panel-header-1"
                aria-controls="controlled-panel-content-1"
              >
                <Typography>{el[1].toUpperCase()}</Typography>
              </AccordionSummary>

              <TableContainer component={Paper}>
                <Table size="medium" aria-label="simple table">
                  <TableHead sx={{ backgroundColor: "black" }}>
                    <TableRow>
                      <TableCell sx={{ color: "white" }} align="left">
                        CPMK
                      </TableCell>
                      <TableCell sx={{ color: "white" }} align="left">
                        {el[2] ? "Nilai CPMK" : "Bobot CPMK"}
                      </TableCell>
                      <TableCell
                        sx={{ color: "white" }}
                        align={el[2] ? "center" : "left"}
                      >
                        {el[2] ? "Status" : "Nilai CPMK"}
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {data.raport[el[0]].map((row) => (
                      <Tooltip
                        arrow
                        title={
                          <h2 style={{ fontWeight: "300" }}>
                            {row.cpmk.statement}
                          </h2>
                        }
                        placement="left-start"
                      >
                        <TableRow
                          key={row.id}
                          hover
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            width={75}
                            align="left"
                            component="th"
                            scope="row"
                          >
                            <Typography>{row.cpmk.name}</Typography>
                          </TableCell>
                          <TableCell width={30} align="left">
                            {el[2] ? (
                              <Typography>
                                {parseFloat(row.value).toFixed(2)}
                              </Typography>
                            ) : (
                              <Typography>
                                {parseFloat(row.bobot_cpmk * 100).toFixed(2)}%
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell
                            width={30}
                            align={el[2] ? "center" : "left"}
                          >
                            <Typography
                              sx={{ color: getColorCPMK(row.nilai_cpmk)[0] }}
                            >
                              {el[2] ? (
                                <Typography>
                                  <Button
                                    style={{
                                      color: "white",
                                      maxHeight: "25px",
                                      borderRadius: "15px",
                                    }}
                                    variant="contained"
                                    size="small"
                                    sx={{
                                      backgroundColor: getColorCPMK(
                                        parseFloat(row.value).toFixed(2)
                                      )[0],
                                    }}
                                  >
                                    {
                                      getColorCPMK(
                                        parseFloat(row.value).toFixed(2)
                                      )[1]
                                    }
                                  </Button>
                                </Typography>
                              ) : (
                                row.nilai_cpmk
                              )}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </Tooltip>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Accordion>
          );
        })}
      </DialogContent>

      <DialogActions className="dialog-actions-dense" sx={{ mt: "25px" }}>
        <Button onClick={close} size="medium" variant="outlined" sx={{ mr: 3 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogMahasiswa;
