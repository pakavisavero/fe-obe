import { CardContent, Grid, Button, Divider, Box, Card } from "@mui/material";

import React, { useEffect, useState } from "react";

// ** MUI Imports
import Typography from "@mui/material/Typography";

import _ from "lodash";

import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import axios from "src/configs/AxiosSetting";

import { useDispatch, useSelector } from "react-redux";
import { DrawColumn, DrawFilter, DrawField } from "src/utils/field";

import DialogSelected from "../child/dialogSelected";
import CardActionCollapse from "src/views/ui/cards/actions/CardActionCollapse";
import Translations from "src/layouts/components/Translations";

import { fetchDataOption as fetchDataTahunAjaran } from "src/store/apps/master/tahunAjaran";
import { fetchDataOption as fetchDataMataKuliah } from "src/store/apps/master/mataKuliah";

import GraphicAssessment from "../child/graphicAssessment";

import { getCookie } from "cookies-next";
import qs from "qs";
import toast from "react-hot-toast";

const Index = ({ control, errors, data, setValue, watch, isEdit }) => {
  const dispatch = useDispatch();
  const token = getCookie("token");

  const [pageSize, setPageSize] = useState(10);

  const [openDialog, setOpenDialog] = useState(false);
  const [allMatkul, setAllMatkul] = useState([]);
  const [detailMatkul, setDetailMatkul] = useState([]);

  const [matkul, setMatkul] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [keyFilter, setKeyFilter] = useState([]);

  const [cpmk, setCpmk] = useState([]);
  const [cpl, setCpl] = useState([]);
  const [labelCpmk, setLabelCpmk] = useState([]);
  const [labelCpl, setLabelCpl] = useState([]);

  let cpmkList = [];
  let cplList = [];
  let labelCpmkList = [];
  let labelCplList = [];

  const { data: dataTahunAjaran } = useSelector((state) => state.tahunAjaran);
  const { data: dataMataKuliah } = useSelector((state) => state.mataKuliah);

  const handleFilter = async (name, value) => {
    const exist = keyFilter.filter((item) => item.key == name);
    if (exist.length > 0) {
      const except = keyFilter.filter((item) => item.key != name);
      setKeyFilter(except);
    }

    setKeyFilter((prev) => [...prev, { key: name, value: value }]);
    const listFilter = [...keyFilter, { key: name, value: value }];
    let params = {};
    if (value) {
      listFilter.map((filter) => (params[filter.key] = filter.value));
    } else {
      const keys = listFilter.map((item) => item.key === name);
      keys.map((filter) => (params[filter.key] = filter.value));
    }

    const response = await axios.get("assessment-matkul/option", {
      headers: { token },
      params,
      paramsSerializer: (params) => qs.stringify(params),
    });

    setMatkul(response.data.data);
  };

  const debounced = async (event) => {
    const { value, name } = event.target;
    handleFilter(name, value);
  };

  const handleFilterAutoComplete = (name, val) => (event, newValue) => {
    const value = newValue ? newValue.id : null;
    handleFilter(name, value);
  };

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  function initDataGraphic() {
    let tempCpmk = [];
    let tempCpl = [];

    const children = data.children;
    for (let child of children) {
      const dataCpmk = child.perkuliahan.cpmk;
      const dataCpl = child.perkuliahan.cpl;

      // CPMK
      for (let cpmk of dataCpmk) {
        const exLabelCpmk = labelCpmk.filter((label) => label === cpmk.name);
        if (exLabelCpmk.length < 1) {
          labelCpmkList.push(cpmk.name);
        }
        tempCpmk.push(cpmk);
      }
      cpmkList.push(tempCpmk.map((item) => parseFloat(item.value).toFixed(2)));
      tempCpmk = [];

      // CPL
      for (let cpl of dataCpl) {
        const exLabelCpl = labelCpl.filter((label) => label === cpl.name);
        if (exLabelCpl.length < 1) {
          labelCplList.push(cpl.name);
        }
        console.log(cpl);
        tempCpl.push(cpl);
      }
      cplList.push(tempCpl.map((item) => item.value.toFixed(2)));
      tempCpl = [];
    }
  }

  const onRowsSelectionHandler = async (row, elements) => {
    let selRow = elements.filter((el) => el.id === row[row.length - 1]);
    selRow = selRow[selRow.length - 1];

    let isPerm = true;
    if (selRow) {
      selectedRows.map((sel) => {
        if (
          selRow.tahun_ajaran_id === sel.tahun_ajaran_id &&
          selRow.semester === sel.semester &&
          row.length > selectedRows.length
        ) {
          isPerm = false;
          toast.error(
            "Tidak bisa memilih perkuliahan pada semester dan tahun ajaran yang sama!",
            {
              duration: 2000,
            }
          );
        }
      });
    }

    if (!isPerm) {
      return;
    }

    if (row.length > 0) {
      const exist = selectedRows.filter((row) => row.id == selRow.id)[0];
      if (!exist) {
        setSelectedRows((prev) => [...prev, selRow]);
      }

      if (row.length < selectedRows.length) {
        const notDelete = selectedRows.filter((row) => row.id == selRow.id);
        setSelectedRows([...notDelete]);
      }

      if (row.length == 1) {
        const pk = elements.filter((el) => el.id === parseInt(row[0]))[0];
        const response = await axios.get(
          `get-perkuliahan-by-matkul/${pk.mata_kuliah_id}`
        );

        setMatkul(response.data.data);
      }
    } else {
      setSelectedRows([]);
      setMatkul(allMatkul);
    }
  };

  useEffect(() => {
    if (isEdit) {
      initDataGraphic();
      setCpmk(cpmkList);
      setCpl(cplList);
      setLabelCpmk(labelCpmkList);
      setLabelCpl(labelCplList);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchDataTahunAjaran());
    dispatch(fetchDataMataKuliah());

    if (!isEdit) {
      setAllMatkul(data.option.map((item) => item));
      setMatkul(data.option.map((item) => item));
    } else {
      setAllMatkul(data.children.map((item) => item.perkuliahan));
      setMatkul(data.children.map((item) => item.perkuliahan));
    }
  }, []);

  useEffect(() => {
    if (!isEdit) {
      setValue("children", [...selectedRows.map((item) => item.id)]);
    }
  }, [selectedRows]);

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
      minWidth: 150,
      name: "kode_mk",
      type: "custom",
      headerName: "Kode MK",
      renderCell: ({ row }) => (
        <Typography>{row.mataKuliah?.kode_mk || "-"}</Typography>
      ),
    },
    {
      minWidth: 450,
      name: "mata_kuliah",
      type: "custom",
      headerName: "Mata Kuliah",
      renderCell: ({ row }) => (
        <Typography>{row.mataKuliah?.mata_kuliah || "-"}</Typography>
      ),
    },
    {
      minWidth: 250,
      name: "kelas",
      type: "custom",
      headerName: "Kelas",
      renderCell: ({ row }) => <Typography>{row.kelas || "-"}</Typography>,
    },
    {
      minWidth: 200,
      name: "semester",
      type: "custom",
      headerName: "Semester",
      renderCell: ({ row }) => <Typography>{row.semester || "-"}</Typography>,
    },
    {
      minWidth: 200,
      name: "tahun_ajaran",
      type: "custom",
      headerName: "Tahun Ajaran",
      renderCell: ({ row }) => (
        <Typography>{row.tahunAjaran?.tahun_ajaran || "-"}</Typography>
      ),
    },
    {
      headerName: "Detail",
      type: "custom",
      minWidth: 200,
      renderCell: ({ row }) => {
        return (
          <Button
            size="small"
            variant="outlined"
            sx={{ borderRadius: "20px" }}
            onClick={() => {
              setDetailMatkul(row);
              setOpenDialog(true);
            }}
          >
            Detail
          </Button>
        );
      },
    },
  ];

  const fieldFilter = [
    {
      name: "mata_kuliah",
      type: "autocomplete",
      onChange: handleFilterAutoComplete("mata_kuliah_id"),
      label: "Mata Kuliah",
      optLabel: "kode_mk",
      optLabel2: "mata_kuliah",
      data: _.sortBy(dataMataKuliah, ["mata_kuliah"]),
      xs: 12,
      md: 4,
    },
    {
      name: "kelas",
      type: "text",
      onChange: debounced,
      label: "Kelas",
      xs: 12,
      md: 4,
    },
    {
      name: "semester",
      type: "select",
      onChange: debounced,
      label: "Semester",
      xs: 12,
      md: 4,
      opt: [
        {
          value: "",
          label: "All",
        },
        {
          value: "Gasal",
          label: "Gasal",
        },
        {
          value: "Genap",
          label: "Genap",
        },
      ],
    },
    {
      name: "tahun_ajaran",
      type: "autocomplete",
      onChange: handleFilterAutoComplete("tahun_ajaran_id"),
      label: "Tahun Ajaran",
      optLabel: "tahun_ajaran",
      data: _.sortBy(dataTahunAjaran, ["tahun_ajaran"]),
      xs: 12,
      md: 4,
    },
  ];

  const fields = [...columns.map((col) => DrawColumn(col))];

  const graphics = [
    <GraphicAssessment
      title={`EVALUASI CPMK ${data.matkul}`}
      type="bar-multiple"
      nilai={cpmk}
      labels={labelCpmk.filter(onlyUnique)}
      legends={data.legends}
      color={labelCpmk.length}
    />,
    <GraphicAssessment
      title={`EVALUASI PENCAPAIAN CPL ${data.matkul}`}
      type="bar-multiple"
      nilai={cpl}
      labels={labelCpl.filter(onlyUnique)}
      legends={data.legends}
      color={labelCpl.length}
    />,
  ];

  return (
    <>
      {openDialog && (
        <DialogSelected
          open={openDialog}
          close={() => setOpenDialog(false)}
          data={detailMatkul}
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
          {!isEdit ? "Pilih" : ""} Assessment Mata Kuliah
        </Typography>
        {!isEdit && (
          <>
            <CardActionCollapse title={<Translations text={"Filters"} />}>
              <Grid container spacing={2}>
                {fieldFilter.map((field, key) => DrawFilter(field, key))}
              </Grid>
            </CardActionCollapse>
            <Box sx={{ mb: 8 }}></Box>
          </>
        )}
        <DataGrid
          autoHeight
          pagination
          columns={fields}
          rows={matkul}
          pageSize={pageSize}
          disableSelectionOnClick
          checkboxSelection={!isEdit ? true : false}
          disableColumnFilter
          rowsPerPageOptions={[10, 20, 50, 100]}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          selectionModel={selectedRows.map((item) => item.id)}
          onSelectionModelChange={(row) => onRowsSelectionHandler(row, matkul)}
          // isRowSelectable={(params) => {
          //   return decideCheck(params.row);
          // }}
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
            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
              {
                display: "none",
              },
          }}
        />

        {isEdit && (
          <>
            <Box sx={{ mb: 8 }}></Box>
            {cpmk.length > 0 && cpl.length > 0 && (
              <>
                <Grid
                  container
                  spacing={2}
                  sx={{ marginY: "30px", marginLeft: "10px" }}
                >
                  {graphics.map((graph) => (
                    <Grid item xs={6} sx={{ mb: 15, height: 450 }}>
                      <Card sx={{ height: 450, padding: 5 }}>{graph}</Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </>
        )}
      </CardContent>
    </>
  );
};

export default Index;
