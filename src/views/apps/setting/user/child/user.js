import { Box, CardContent, IconButton, Tooltip } from "@mui/material";

import DeleteOutline from "mdi-material-ui/DeleteOutline";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";

import DialogConfirmation from "src/utils/DialogConfirmation";

function User({ value, setValue }) {
  const [pageSize, setPageSize] = useState(10);
  const [confirmation, setConfirmation] = useState(false);
  const [rowDelete, setRowDelete] = useState();

  const handleClose = () => setConfirmation(false);

  const handleDeleteRole = (id) => {
    if (value.length < 2) {
      setConfirmation(false);
      toast.error("Tidak bisa menghapus semua role pada user!");
      return;
    }
    const roles = value.filter((r) => r.id !== id);
    setValue("roles", roles);
    setConfirmation(false);
    toast.success("Sukses menghapus role!");
  };

  const defaultColumns = [
    {
      field: "role_name",
      headerName: "Role Name",
      minWidth: 400,
    },
  ];

  const columns = [
    {
      minWidth: 80,
      sortable: false,
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Delete Data">
            <IconButton
              size="small"
              onClick={() => {
                setRowDelete(row.id);
                setConfirmation(true);
              }}
            >
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
    ...defaultColumns,
  ];

  return (
    <>
      {confirmation && (
        <DialogConfirmation
          title={"Are you sure to delete this role"}
          open={confirmation}
          callbackFunc={() => handleDeleteRole(rowDelete)}
          handleClose={() => handleClose()}
        />
      )}
      <CardContent>
        <DataGrid
          autoHeight
          pagination
          rows={value}
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

export default User;
