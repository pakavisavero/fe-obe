import { CardContent, Grid, Divider, Box, IconButton } from "@mui/material";

import { DrawField } from "src/utils/field";

import React, { useEffect, useState, Component } from "react";

// ** MUI Imports
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import ChevronDown from "mdi-material-ui/ChevronDown";

import _ from "lodash";

import { DataGrid } from "@mui/x-data-grid";
import { DrawColumn, DrawFilter, handleOnChangeRange } from "src/utils/field";

import DialogSelected from "../child/dialogSelected";
import Tooltip from "@mui/material/Tooltip";

import TrashCan from "mdi-material-ui/TrashCan";
import toast from "react-hot-toast";

const Index = ({ control, errors, data, setValue, watch, isEdit }) => {
  const [expanded, setExpanded] = useState(false);

  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [allPerkuliahan, setAllPerkuliahan] = useState([]);
  const [selectedRows, setSelectedRows] = useState();
  const [semester, setSemester] = useState();
  const [tahunAjaran, setTahunAjaran] = useState();

  const [openDialog, setOpenDialog] = useState(false);
  const [checkbox, setCheckbox] = useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onRowsSelectionHandler = (row, item) => {
    setSelectedRows(row);
    setTahunAjaran(item.tahunAjaran);
    setSemester(item.semester);
    setOpenDialog(true);
  };

  const getColorNilai = (nilai) => {
    if (nilai > 69.9) {
      return "green";
    } else {
      return "red";
    }
  };

  const deleteRow = (row) => {
    const rest = checkbox.filter((check) => !(check.copyId == row.copyId));
    setCheckbox(rest);
    toast.error(
      `Menghapus perkuliahan ${row.mataKuliah.kode_mk} - ${row.mataKuliah.mata_kuliah}`,
      {
        duration: 2000,
      }
    );
  };

  useEffect(() => {
    if (isEdit) {
      let children = [];
      for (let child of data.children) children.push(child.perkuliahan);
      setCheckbox(children);
    }
  }, []);

  const fieldsLeft = [
    {
      name: "name",
      type: "text",
      label: "Nama Siklus",
      xs: 12,
      md: 12,
    },
    {
      name: "created_by",
      type: "text",
      label: "Created By",
      xs: 12,
      md: 12,
      disabled: true,
    },
  ];

  const fieldsRight = [
    {
      name: "description",
      type: "text",
      label: "Deskripsi",
      xs: 12,
      md: 12,
      multiline: true,
      rows: 4,
    },
  ];

  const columns = [
    {
      minWidth: 100,
      name: "name",
      type: "custom",
      headerName: "CPL",
      renderCell: ({ row }) => (
        <Typography sx={{ fontWeight: "bold" }}>{row.name}</Typography>
      ),
    },
    {
      minWidth: 1200,
      name: "statement",
      headerName: "Deskripsi",
      value: (value) => (value.statement ? value.statement : "-"),
    },
  ];

  const fields = [...columns.map((col) => DrawColumn(col))];

  const closeDialog = () => {
    setOpenDialog(false);
    setSelectedRows("");
    setTahunAjaran("");
    setSemester("");
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
      minWidth: 300,
      name: "pengampu_utama",
      headerName: "Pengampu Utama",
      value: (value) => (value.dosen1 ? value.dosen1.full_name : "-"),
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

  const fieldSelectedMapping = [...fieldSelected.map((col) => DrawColumn(col))];

  if (!isEdit) {
    fieldSelectedMapping.unshift({
      minWidth: 10,
      sortable: false,
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Delete">
            <Box>
              <IconButton
                size="small"
                component="a"
                sx={{ textDecoration: "none" }}
                onClick={() => deleteRow(row)}
              >
                <TrashCan fontSize="medium" sx={{ color: "red" }} />
              </IconButton>
            </Box>
          </Tooltip>
        </Box>
      ),
    });
  }

  return (
    <>
      {selectedRows && (
        <DialogSelected
          open={openDialog}
          close={() => closeDialog()}
          cpl={selectedRows}
          isEdit={isEdit}
          checkbox={checkbox.filter(
            (item) =>
              item.semester === semester &&
              item.tahunAjaran.tahun_ajaran === tahunAjaran.tahun_ajaran &&
              item.infoCpl === selectedRows.name
          )}
          otherCheckbox={checkbox.filter((item) => {
            return !(
              item.semester == semester &&
              item.tahunAjaran.tahun_ajaran == tahunAjaran.tahun_ajaran &&
              item.infoCpl == selectedRows.name
            );
          })}
          setCheckbox={setCheckbox}
          semester={semester}
          tahunAjaran={tahunAjaran}
          setValue={setValue}
          watch={watch}
        />
      )}

      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <Grid container spacing={2}>
              {fieldsLeft.map((field, key) =>
                DrawField(field, errors, control, key)
              )}
            </Grid>
          </Grid>

          <Grid item xs={7}>
            <Grid container spacing={2}>
              {fieldsRight.map((field, key) =>
                DrawField(field, errors, control, key)
              )}
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />
      <CardContent>
        <Typography variant="h5" sx={{ mb: 8, ml: 3 }}>
          Representasi CPL
        </Typography>

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
          rows={checkbox}
          pageSize={pageSize}
          checkboxSelection={false}
          rowsPerPageOptions={[10, 20, 50, 100]}
          disableSelectionOnClick={true}
          getRowId={(row) => row.copyId}
          sx={{
            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
              {
                display: "none",
              },
          }}
        />
        <Box sx={{ mb: 10 }}></Box>

        <Typography variant="h5" sx={{ mb: 8, ml: 3 }}>
          Pilih Siklus CPL
        </Typography>

        {data.option.map((item) => {
          return (
            <Accordion
              expanded={expanded === `panel-${item.id}`}
              onChange={handleChange(`panel-${item.id}`)}
              sx={{ width: "100%", mb: 5 }}
            >
              <AccordionSummary
                expandIcon={<ChevronDown />}
                id="controlled-panel-header-1"
                aria-controls="controlled-panel-content-1"
              >
                TA. {item.tahunAjaran.tahun_ajaran} -{" "}
                {item.semester.toUpperCase()}
              </AccordionSummary>

              <DataGrid
                autoHeight
                pagination
                columns={fields}
                rows={item.cpl}
                pageSize={pageSize}
                disableSelectionOnClick
                rowsPerPageOptions={[10, 20, 50, 100]}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                onRowClick={({ row }) => onRowsSelectionHandler(row, item)}
                getRowClassName={(params) => {
                  return "";
                }}
                sx={{
                  // disable cell selection style
                  ".MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                  // pointer cursor on ALL rows
                  "& .MuiDataGrid-row:hover": {
                    cursor: "pointer",
                  },
                }}
              />
            </Accordion>
          );
        })}
      </CardContent>
    </>
  );
};

export default Index;
