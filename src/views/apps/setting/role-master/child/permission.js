import {
  Box,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";

import DeleteOutline from "mdi-material-ui/DeleteOutline";
import EyeOutline from "mdi-material-ui/EyeOutline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DataGrid } from "@mui/x-data-grid";
import "react-datepicker/dist/react-datepicker.css";

function Permission({ control, store, data, setValue }) {
  const [pageSize, setPageSize] = useState(10);
  const [permission, setPermission] = useState([]);
  const [headerVal, setHeaderVal] = useState({
    view: false,
    add: false,
    edit: false,
    export: false,
    printt: false,
  });

  useEffect(() => {
    setPermission(data);
  }, []);

  const setAllCheckbox = async ({ field }) => {
    const temp = permission.map((perm) => {
      return {
        ...perm,
        [field]: !headerVal[field],
      };
    });
    setPermission(temp);
    setValue("children", temp);
  };

  const setSpecificCheckbox = (element, row) => {
    const idx = permission.findIndex((perm) => perm.id === row.id);
    const filtered = permission;
    filtered[idx][element] = !row[element];
    setPermission(filtered);
    setValue("children", filtered);
  };

  const defaultColumns = [
    {
      field: "module_group_name",
      headerName: "Module Group",
      minWidth: 280,
      renderCell: ({ row }) => (
        <Typography variant="body2">
          {`${row.module_group_name || "-"}`}
        </Typography>
      ),
    },
    {
      field: "module_name",
      headerName: "Module Name",
      minWidth: 280,
    },
    {
      width: 150,
      field: "view",
      disableColumnMenu: true,
      sortable: false,
      renderHeader: (row) => (
        <FormControlLabel
          labelPlacement="end"
          control={
            <Checkbox
              value={headerVal.view}
              onClick={() => {
                setHeaderVal((prev) => ({
                  ...prev,
                  view: !headerVal.view,
                }));
                setAllCheckbox(row);
              }}
            />
          }
          label={"View"}
        />
      ),
      renderCell: ({ row }) => (
        <Box>
          <Checkbox
            onClick={() => setSpecificCheckbox("view", row)}
            checked={row.view}
          />
        </Box>
      ),
    },
    {
      width: 150,
      field: "add",
      disableColumnMenu: true,
      sortable: false,
      renderHeader: (row) => (
        <FormControlLabel
          labelPlacement="end"
          control={
            <Checkbox
              value={headerVal.add}
              onClick={() => {
                setHeaderVal((prev) => ({
                  ...prev,
                  add: !headerVal.add,
                }));
                setAllCheckbox(row);
              }}
            />
          }
          label={"Add"}
        />
      ),
      renderCell: ({ row }) => (
        <Box>
          <Checkbox
            onClick={() => setSpecificCheckbox("add", row)}
            checked={row.add}
          />
        </Box>
      ),
    },
    {
      width: 150,
      field: "edit",
      disableColumnMenu: true,
      sortable: false,
      renderHeader: (row) => (
        <FormControlLabel
          labelPlacement="end"
          control={
            <Checkbox
              value={headerVal.edit}
              onClick={() => {
                setHeaderVal((prev) => ({
                  ...prev,
                  edit: !headerVal.edit,
                }));
                setAllCheckbox(row);
              }}
            />
          }
          label={"Edit"}
        />
      ),
      renderCell: ({ row }) => (
        <Box>
          <Checkbox
            onClick={() => setSpecificCheckbox("edit", row)}
            checked={row.edit}
          />
        </Box>
      ),
    },
    {
      width: 150,
      field: "export",
      disableColumnMenu: true,
      sortable: false,
      renderHeader: (row) => (
        <FormControlLabel
          labelPlacement="end"
          control={
            <Checkbox
              value={headerVal.export}
              onClick={() => {
                setHeaderVal((prev) => ({
                  ...prev,
                  export: !headerVal.export,
                }));
                setAllCheckbox(row);
              }}
            />
          }
          label={"Export"}
        />
      ),
      renderCell: ({ row }) => (
        <Box>
          <Checkbox
            onClick={() => setSpecificCheckbox("export", row)}
            checked={row.export}
          />
        </Box>
      ),
    },
    {
      width: 150,
      field: "printt",
      disableColumnMenu: true,
      sortable: false,
      renderHeader: (row) => (
        <FormControlLabel
          labelPlacement="end"
          control={
            <Checkbox
              value={headerVal.printt}
              onClick={() => {
                setHeaderVal((prev) => ({
                  ...prev,
                  printt: !headerVal.printt,
                }));
                setAllCheckbox(row);
              }}
            />
          }
          label={"Print"}
        />
      ),
      renderCell: ({ row }) => (
        <Box>
          <Checkbox
            onClick={() => setSpecificCheckbox("printt", row)}
            checked={row.printt}
          />
        </Box>
      ),
    },
  ];

  const columns = [...defaultColumns];

  return (
    <>
      <CardContent>
        <DataGrid
          autoHeight
          pagination
          disableColumnFilter
          rows={permission}
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

export default Permission;
