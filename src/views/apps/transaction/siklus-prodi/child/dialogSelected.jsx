import {
  Grid,
  Divider,
  Button,
  Typography,
} from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { DrawColumn } from "src/utils/field";

import axios from "src/configs/AxiosSetting";
import toast from "react-hot-toast";

const DialogSelected = ({
  open,
  isEdit,
  close,
  cpl,
  semester,
  tahunAjaran,
  setCheckbox,
  checkbox,
  otherCheckbox,
  setValue,
  watch,
}) => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);

  const [loading, setLoading] = useState(true);
  const [perkuliahan, setPerkuliahan] = useState([]);

  async function getPerkuliahan() {
    const config = {
      method: "post",
      url: "get-perkuliahan-by-cpl",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        cpl_id: cpl.id,
        semester: semester,
        tahun_ajaran_id: tahunAjaran.id,
      },
    };
    const response = await axios(config);
    if (response.data.code !== 200) {
      return {
        notFound: true,
      };
    }

    for (let r of response.data.data) {
      r.infoCpl = cpl.name;
      r.infoCplStatement = cpl.statement;
    }

    setPerkuliahan(response.data.data);
    setLoading(false);
  }

  useEffect(() => {
    getPerkuliahan();
  }, []);

  useEffect(() => {
    setValue("siklus", [...checkbox, ...otherCheckbox]);
  }, [checkbox]);

  const getColorNilai = (nilai) => {
    if (nilai > 69.9) {
      return "green";
    } else {
      return "red";
    }
  };

  const columns = [
    {
      minWidth: 100,
      name: "kode_mk",
      headerName: "Kode MK",
      value: (value) => (value.mataKuliah ? value.mataKuliah.kode_mk : "-"),
    },
    {
      minWidth: 300,
      name: "mata_kuliah",
      headerName: "Mata Kuliah",
      value: (value) => (value.mataKuliah ? value.mataKuliah.mata_kuliah : "-"),
    },
    {
      minWidth: 350,
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

  const fields = [...columns.map((col) => DrawColumn(col))];

  const onRowsSelectionHandler = (ids) => {
    if (ids.length > checkbox.length) {
      const id = ids[ids.length - 1];
      const pk = perkuliahan.filter((item) => item.id === id)[0];

      const appendPk = perkuliahan.filter(
        (pk) => pk.id === ids[ids.length - 1]
      )[0];
      if (appendPk) {
        setCheckbox((prev) => [...prev, appendPk]);
      }

      toast.success(
        `Menambah perkuliahan ${pk.mataKuliah.kode_mk} - ${pk.mataKuliah.mata_kuliah}`,
        {
          duration: 2000,
        }
      );
    } else {
      let erased = {};
      let toInsert = [];
      const map = checkbox.map((check) => check.id);

      let idx = 0;
      for (let m of map) {
        if (ids.includes(m)) {
          toInsert.push(checkbox.filter((check) => check.id === m)[0]);
        } else {
          erased = checkbox.filter((check) => check.id === m)[0];
        }

        idx++;
      }

      setCheckbox([...otherCheckbox, ...toInsert]);
      if (ids.length < 1) {
        setCheckbox(otherCheckbox);
      }

      toast.error(
        `Menghapus perkuliahan ${erased.mataKuliah.kode_mk} - ${erased.mataKuliah.mata_kuliah}`,
        {
          duration: 2000,
        }
      );
    }
  };

  const headerData = [
    { nama: "Tahun Ajaran", value: tahunAjaran.tahun_ajaran },
    { nama: "Semester", value: semester },
    { nama: cpl.name, value: cpl.statement },
  ];

  return (
    !loading && (
      <Dialog
        maxWidth="lg"
        fullWidth
        open={open}
        onClose={close}
        aria-labelledby="form-dialog-content"
      >
        <DialogTitle id="form-dialog-title">{`Pilih Perkuliahan`}</DialogTitle>
        {headerData.map((item) => (
          <Grid container spacing={3} sx={{ ml: 3, mb: 4 }}>
            <Grid item width={150}>
              <Typography>{item.nama}</Typography>
            </Grid>
            <Grid item width={30}>
              <Typography>:</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>{item.value}</Typography>
            </Grid>
          </Grid>
        ))}

        <Divider />
        <DialogContent id="form-dialog-content">
          <>
            <DataGrid
              disableColumnFilter
              autoHeight
              pagination
              columns={fields}
              rows={perkuliahan}
              pageSize={pageSize}
              checkboxSelection={true}
              rowsPerPageOptions={[10, 20, 50, 100]}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              disableSelectionOnClick={true}
              getRowId={(row) => row.id}
              isRowSelectable={() => (isEdit ? false : true)}
              onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
              selectionModel={checkbox.map((item) => item.id)}
              sx={{
                // disable cell selection style
                ".MuiDataGrid-cell:focus": {
                  outline: "none",
                },
                "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
                  {
                    display: "none",
                  },
              }}
            />
          </>
        </DialogContent>

        <DialogActions className="dialog-actions-dense" sx={{ mt: "25px" }}>
          <Button
            onClick={close}
            size="medium"
            variant="outlined"
            sx={{ mr: 3 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
};

export default DialogSelected;
