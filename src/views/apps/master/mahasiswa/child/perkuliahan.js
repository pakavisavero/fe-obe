import {
  Box,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
  Button,
  Grid,
} from "@mui/material";

import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

import Printer from "mdi-material-ui/Printer";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";

function Perkuliahan({ control, store, watch }) {
  const router = useRouter();
  const { id } = router.query;

  const [pageSize, setPageSize] = useState(10);
  const [datagrid, setDatagrid] = useState([]);
  const [checkbox, setCheckbox] = useState([]);

  useEffect(() => {
    let checkedAll = [];
    setDatagrid(watch("perkuliahan"));

    for (const data of watch("perkuliahan")) checkedAll.push(data.id);
    setCheckbox(checkedAll);
  }, []);

  const setSelectedRows = (row) => {
    console.log(row);
    if (row.length < 1) {
      setCheckbox([]);
    } else {
      setCheckbox(row);
    }
  };

  const navigatePrint = (id) => {
    const url = `/print/raport-mhs/${id}`;

    if (checkbox.length < datagrid.length) {
      sessionStorage.setItem("pks", checkbox);
      window.open(url, "_blank");
    }

    window.open(`${url}?selected=all`, "_blank");
  };

  const defaultColumns = [
    {
      field: "mata_kuliah",
      headerName: "Mata Kuliah",
      minWidth: 400,
      renderCell: ({ row }) => (
        <Typography variant="body2">{`${row.mata_kuliah || "-"}`}</Typography>
      ),
    },
    {
      field: "kelas",
      headerName: "Kelas",
      minWidth: 200,
    },
    {
      field: "semester",
      headerName: "Semester",
      minWidth: 250,
    },
    {
      field: "tahun_ajaran",
      headerName: "Tahun Ajaran",
      minWidth: 300,
      renderCell: ({ row }) => (
        <Typography variant="body2">{`${row.tahun_ajaran || "-"}`}</Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      renderCell: ({ row }) => {
        if (!row.is_active) {
          return (
            <Button
              style={{ maxHeight: "25px", borderRadius: "15px" }}
              variant="contained"
              color="error"
              size="small"
            >
              Tidak Aktif
            </Button>
          );
        } else {
          return (
            <Button
              style={{ maxHeight: "25px", borderRadius: "15px" }}
              variant="contained"
              color="info"
              size="small"
            >
              Aktif
            </Button>
          );
        }
      },
    },
  ];

  const columns = [...defaultColumns];

  return (
    <>
      <CardContent>
        {datagrid.length > 0 && (
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
                  Print Raport
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}

        <DataGrid
          autoHeight
          pagination
          rows={datagrid}
          columns={columns}
          disableSelectionOnClick
          disableColumnFilter
          checkboxSelection={true}
          selectionModel={checkbox.map((check) => check)}
          pageSize={Number(pageSize)}
          rowsPerPageOptions={[10, 25, 50, 100]}
          onSelectionModelChange={(rows) => setSelectedRows(rows)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </CardContent>
    </>
  );
}

export default Perkuliahan;
