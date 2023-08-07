import {
  Box,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";

import DeleteOutline from "mdi-material-ui/DeleteOutline";
import EyeOutline from "mdi-material-ui/EyeOutline";
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { useFieldArray } from "react-hook-form";

import Translations from "src/layouts/components/Translations";
import SideBarChild from "src/views/apps/SideBarMultiChild";
import TableHeader from "src/views/apps/TableHeader";

import DialogMahasiswa from "./dialogMahasiswa";

function Mahasiswa({ control, store, watch }) {
  const [pageSize, setPageSize] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [detailMhs, setDetailMhs] = useState([]);

  const dispatch = useDispatch();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "mahasiswa",
  });

  const getColorNilai = (nilai) => {
    if (nilai === "Tidak Lulus") {
      return "red";
    } else if (nilai === "Remidi CPMK") {
      return "orange";
    } else {
      return "green";
    }
  };

  const defaultColumns = [
    {
      field: "nim",
      headerName: "NIM",
      minWidth: 200,
    },
    {
      field: "full_name",
      headerName: "Nama Mahasiswa",
      minWidth: 350,
      renderCell: ({ row }) => (
        <Typography variant="body2">{`${
          row.full_name.toUpperCase() || "-"
        }`}</Typography>
      ),
    },
    {
      field: "status_mahasiswa",
      headerName: "Status",
      minWidth: 180,
      renderCell: ({ row }) => (
        <Typography variant="body2">{`${row.status.status || "-"}`}</Typography>
      ),
    },
    {
      field: "doswal",
      headerName: "Dosen Wali",
      minWidth: 280,
      renderCell: ({ row }) => (
        <Typography variant="body2">{`${
          row.doswal?.full_name || "-"
        }`}</Typography>
      ),
    },
  ];

  if (watch("docstatus") != 2) {
    defaultColumns.pop();

    const extraField = [
      {
        field: "nilai_akhir",
        headerName: "Nilai Akhir",
        minWidth: 150,
        renderCell: ({ row }) => {
          return (
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
              }}
            >
              {`
                                ${
                                  row.raport?.nilai_pokok?.nilai_akhir?.toFixed(
                                    2
                                  ) || "-"
                                }
                            `}
            </Typography>
          );
        },
      },
      {
        field: "huruf",
        headerName: "Huruf",
        minWidth: 150,
        renderCell: ({ row }) => {
          return (
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
              }}
            >
              {`
                                ${
                                  row.raport?.nilai_pokok?.nilai_akhir_huruf ||
                                  "-"
                                }
                            `}
            </Typography>
          );
        },
      },
      {
        field: "keterangan",
        headerName: "Keterangan",
        minWidth: 200,
        renderCell: ({ row }) => {
          return (
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: getColorNilai(row.raport.nilai_pokok.keterangan),
              }}
            >
              {`${row.raport?.nilai_pokok?.keterangan?.toUpperCase() || "-"}`}
            </Typography>
          );
        },
      },
      {
        field: "button",
        headerName: "Detail",
        minWidth: 200,
        renderCell: ({ row }) => {
          return (
            <Button
              size="small"
              variant="outlined"
              sx={{ borderRadius: "20px" }}
              onClick={() => {
                setDetailMhs(row);
                setOpenDialog(true);
              }}
            >
              Detail
            </Button>
          );
        },
      },
    ];

    for (var xtra of extraField) defaultColumns.push(xtra);
  }

  const columns = [...defaultColumns];

  return (
    <>
      {openDialog && (
        <DialogMahasiswa
          open={openDialog}
          close={() => setOpenDialog(false)}
          data={detailMhs}
        />
      )}

      <CardContent>
        <DataGrid
          autoHeight
          pagination
          rows={fields}
          columns={columns}
          disableSelectionOnClick
          pageSize={Number(pageSize)}
          rowsPerPageOptions={[10, 25, 50, 100]}
          onSelectionModelChange={(rows) => setSelectedRows(rows)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        />
      </CardContent>
    </>
  );
}

export default Mahasiswa;
