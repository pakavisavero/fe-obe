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

import { DataGrid } from "@mui/x-data-grid";

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
import Tooltip from "@mui/material/Tooltip";

import { DrawColumn, DrawFilter, handleOnChangeRange } from "src/utils/field";

const DialogSiklus = ({ open, close, data }) => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);
  const [pks, setPk] = useState([]);

  useEffect(() => {
    let datas = [];
    for (let dt of data.children) {
      dt.perkuliahan.infoCpl = dt.cpl.name;
      dt.perkuliahan.infoCplStatement = dt.cpl.statement;
      datas.push(dt.perkuliahan);
    }

    setPk(datas);
  }, []);

  const getColorNilai = (nilai) => {
    if (nilai > 69.9) {
      return "green";
    } else {
      return "red";
    }
  };

  const fieldSelected = [
    {
      minWidth: 120,
      name: "infoCpl",
      type: "custom",
      headerName: "Repr. CPL",
      renderCell: ({ row }) => (
        <Tooltip
          arrow
          title={<h2 style={{ fontWeight: "300" }}>{row.infoCplStatement}</h2>}
          placement="left-start"
        >
          <Typography sx={{ fontWeight: "bold" }}>
            {row.infoCpl ? row.infoCpl : "-"}
          </Typography>
        </Tooltip>
      ),
    },
    {
      minWidth: 340,
      name: "mata_kuliah",
      headerName: "Mata Kuliah",
      value: (value) =>
        value.mataKuliah
          ? value.mataKuliah.kode_mk + " - " + value.mataKuliah.mata_kuliah
          : "-",
    },
    {
      minWidth: 120,
      name: "kelas",
      headerName: "Kelas",
      value: (value) => (value.kelas ? value.kelas : "-"),
    },
    {
      minWidth: 150,
      name: "semester",
      headerName: "Semester",
      value: (value) => (value.semester ? value.semester : "-"),
    },
    {
      minWidth: 190,
      name: "tahun_ajaran",
      headerName: "Tahun Ajaran",
      value: (value) =>
        value.tahunAjaran ? value.tahunAjaran.tahun_ajaran : "-",
    },
    {
      minWidth: 190,
      name: "rata_rata",
      type: "custom",
      headerName: "Rata-Rata CPL",
      renderCell: ({ row }) => (
        <Typography sx={{ color: getColorNilai(row.total) }}>
          {row.total ? row.total : "-"}
        </Typography>
      ),
    },
  ];

  const generateRow = (params) => {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item width={150}>
            <Typography>{params[0]}</Typography>
          </Grid>
          <Grid item width={60}>
            <Typography>:</Typography>
          </Grid>
          <Grid
            item
            xs={8}
            sx={{ color: params[2] ? getColorNilai(params[1]) : "" }}
          >
            {params[1]}
          </Grid>
        </Grid>
        <Divider sx={{ mt: 3 }} />
      </>
    );
  };

  const fieldSelectedMapping = [...fieldSelected.map((col) => DrawColumn(col))];

  return (
    <Dialog
      maxWidth="lg"
      fullWidth
      open={open}
      onClose={close}
      aria-labelledby="form-dialog-content"
    >
      <DialogTitle id="form-dialog-title">Informasi Siklus</DialogTitle>
      <Divider sx={{ mb: 1 }} />

      <DialogContent id="form-dialog-content">
        {generateRow(["Nama Siklus", data.name])}
        {generateRow(["Deskripsi", data.description])}
        <Grid sx={{ mb: 8 }}></Grid>

        <DataGrid
          sortModel={[
            {
              field: "infoCpl",
              sort: "asc",
            },
            {
              field: "tahun_ajaran",
              sort: "asc",
            },
          ]}
          disableColumnFilter
          autoHeight
          pagination
          columns={fieldSelectedMapping}
          rows={pks}
          pageSize={pageSize}
          checkboxSelection={false}
          rowsPerPageOptions={[10, 20, 50, 100]}
          disableSelectionOnClick={true}
          sx={{
            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
              {
                display: "none",
              },
          }}
        />
      </DialogContent>

      <DialogActions className="dialog-actions-dense" sx={{ mt: "25px" }}>
        <Button onClick={close} size="medium" variant="outlined" sx={{ mr: 3 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSiklus;
