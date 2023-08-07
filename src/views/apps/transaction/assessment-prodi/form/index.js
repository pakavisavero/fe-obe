import { CardContent, Grid, Button, Divider, Box, Card } from "@mui/material";

import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Printer from "mdi-material-ui/Printer";

import _ from "lodash";

import { DataGrid } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";
import { DrawColumn, DrawFilter, DrawField } from "src/utils/field";

import DialogSiklus from "../child/dialogSiklus";
import GraphicAssessment from "../child/graphicAssessment";
import { useRouter } from "next/router";

const Index = ({ control, errors, data, setValue, watch, isEdit }) => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  const [openDialog, setOpenDialog] = useState(false);
  const [pageSize, setPageSize] = useState(10);

  const [datagrid, setDatagrid] = useState([]);
  const [detailData, setDetailData] = useState({});

  const [graph, setGraph] = useState([]);
  const [cpl, setCpl] = useState([]);

  const [colors, setColor] = useState([]);
  const [loading, setLoading] = useState(true);

  function getRandomColor() {
    var letters = "ABCDEF".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }

    return color;
  }

  const generateColor = (color) => {
    let list_colors = [];
    for (const x of Array(color).keys()) {
      const col = getRandomColor();
      list_colors.push(col);
    }

    return list_colors;
  };

  const onRowsSelectionHandler = (row) => {
    setDetailData(row);
    setOpenDialog(true);
  };

  const onCheck = (row) => {
    if (!isEdit) setValue("siklus", row);
  };

  const initializeGraph = () => {
    for (const sik of watch("listSiklus")) {
      let values = [];

      for (const graph of watch("graph")) {
        for (const key in graph) {
          const filterSiklus = graph[key].filter(
            (item) => item.siklus === sik
          )[0];
          values.push(
            parseFloat(filterSiklus.value / filterSiklus.sum).toFixed(2)
          );
          setCpl((prev) => [...prev, key]);
        }
      }
      setGraph((prev) => [...prev, values]);
    }
  };

  useEffect(() => {
    setColor(generateColor(2));
    if (!isEdit) {
      setDatagrid(watch("data"));
    } else {
      let bulk = [];

      for (let data of watch("siklus")) bulk.push(data.siklus);
      setDatagrid(bulk);
      initializeGraph();
    }

    setLoading(false);
  }, []);

  const navigatePrint = (id) => {
    const url = `/print/assessment-prodi/${id}`;

    window.open(url, "_blank");
  };

  const fieldsLeft = [
    {
      name: "name",
      type: "text",
      label: "Nama Assessment",
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
      minWidth: 200,
      name: "name",
      type: "custom",
      headerName: "Nama Siklus",
      renderCell: ({ row }) => <Typography>{row.name || "-"}</Typography>,
    },
    {
      minWidth: 300,
      name: "description",
      type: "custom",
      headerName: "Deskripsi",
      renderCell: ({ row }) => (
        <Typography>{row.description || "-"}</Typography>
      ),
    },
  ];

  const fields = [...columns.map((col) => DrawColumn(col))];

  function getUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  return (
    <>
      {openDialog && (
        <DialogSiklus
          open={openDialog}
          data={detailData}
          close={() => setOpenDialog(false)}
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

      <CardContent sx={{ mt: 6 }}>
        <Grid container>
          <Grid item sm={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                size="medium"
                variant="contained"
                sx={{ mb: 8 }}
                startIcon={<Printer fontSize="small" />}
                onClick={() => navigatePrint(id)}
              >
                Print Assessment
              </Button>
            </Box>
          </Grid>
        </Grid>

        <DataGrid
          autoHeight
          pagination
          columns={fields}
          rows={datagrid}
          pageSize={pageSize}
          disableSelectionOnClick
          disableColumnFilter
          checkboxSelection
          rowsPerPageOptions={[10, 20, 50, 100]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onRowClick={({ row }) => onRowsSelectionHandler(row)}
          onSelectionModelChange={(row) => onCheck(row)}
          isRowSelectable={() => (isEdit ? false : true)}
          selectionModel={
            isEdit
              ? watch("siklus").map((item) => item.siklus.id)
              : watch("siklus")
          }
          sx={{
            // disable cell selection style
            ".MuiDataGrid-cell:focus": {
              outline: "none",
            },
            // pointer cursor on ALL rows
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
              {
                display: "none",
              },
          }}
        />

        {isEdit && !loading && (
          <Grid item xs={12} sx={{ mb: 15, mt: 20, height: 600 }}>
            <Card sx={{ height: 600, padding: 10 }}>
              <GraphicAssessment
                title={`Perbandingan Siklus`.toUpperCase()}
                nilai={graph}
                labels={cpl.filter(getUnique)}
                colors={colors}
                legends={watch("listSiklus")}
              />
            </Card>
          </Grid>
        )}
      </CardContent>
    </>
  );
};

export default Index;
