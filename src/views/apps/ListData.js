import { Box, LinearProgress } from "@mui/material";
import Card from "@mui/material/Card";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import EyeOutline from "mdi-material-ui/EyeOutline";

// ** Next Import
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

// ** Third Party Styles Imports

// ** Store & Actions Imports
import { useDispatch, useSelector } from "react-redux";
import { fDateTimeSuffix, fDateSuffixExport } from "src/@core/utils/format";
import TableHeader from "src/views/apps/master/TableHeader";
import Breadcrumbs from "./Breadcrumbs";
import { useSettings } from "src/@core/hooks/useSettings";

// ** Styled Components

// ** Styled component for the link in the dataTable

/* eslint-enable */
const ListData = ({
  defaultColumns,
  urlData,
  filterData,
  updateData,
  clearResponse,
  getData,
  nameLabel,
  storeName,
  dataBreadcrumbs,
  checkboxSelection = true,
  withFlag = true,
  isImport = false,
  isExport = false,
  actionExport = () => {},
  clearParams,
  updateOnly = false,
  witChild = false,
  isForeign = false,
  templateFile = "template_group_management.xlsx",
  importFunction,
  isCreate = true,
  exportName,
  redNotActive = true,
}) => {
  const { settings } = useSettings();

  // ** State
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  // ** Hooks
  const store = useSelector((state) => state[storeName]);
  const { message, error, params, loading, total, data: datagrid } = store;
  const dispatch = useDispatch();

  const handleChangeSwitch = (row) => (e) => {
    const is_active = row.is_active == true ? false : true;
    let data = { ...row, is_active };
    if (witChild) {
      data = { ...row, is_active, from_list: true };
    }
    dispatch(updateData(data));
  };

  const actionRefresh = async () => {
    if (clearParams) dispatch(clearParams());
    dispatch(
      getData({
        page: 0,
        page_size: pageSize,
        ...params,
      })
    );
    setPage(0);
  };

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 200,
      field: "modifiedAt",
      headerName: "Modified At",
      renderCell: ({ row }) => {
        return (
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            {row.modified_at ? fDateTimeSuffix(row.modified_at) : ""}
          </Typography>
        );
      },
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: "createdAt",
      headerName: "Created At",
      renderCell: ({ row }) => {
        return (
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            {row.created_at ? fDateTimeSuffix(row.created_at) : ""}
          </Typography>
        );
      },
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: "modifiedBy",
      headerName: "Modified By",
      renderCell: ({ row }) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>{`${
          row.modified_by || ""
        }`}</Typography>
      ),
    },
    {
      flex: 0.1,
      minWidth: 200,
      field: "createdBy",
      headerName: "Created By",
      renderCell: ({ row }) => (
        <Typography variant="body2" sx={{ color: "text.primary" }}>{`${
          row.created_by || ""
        }`}</Typography>
      ),
    },
    {
      flex: 0.1,
      minWidth: 170,
      sortable: false,
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* {checkboxSelection && withFlag && (
            <Tooltip title='status'>
              <FormControlLabel
                control={
                  <Switch
                    checked={row.is_active === true}
                    size='small'
                    onChange={handleChangeSwitch(row)}
                    value={row.is_active}
                  />
                }
              />
            </Tooltip>
          )} */}
          <Tooltip title="View">
            <Box>
              <Link
                href={`${urlData}edit/${
                  isForeign ? row.warranty_item.id : row.id
                }`}
                passHref
              >
                <IconButton
                  size="small"
                  component="a"
                  sx={{ textDecoration: "none" }}
                >
                  <EyeOutline fontSize="small" />
                </IconButton>
              </Link>
            </Box>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const handleVisibleGrid = (model) => {
    let hides = [];
    for (const [key, value] of Object.entries(model)) {
      if (!value) hides.push(key);
    }
    let dataStorage = JSON.parse(window.localStorage.getItem("visibleColumn"));
    if (dataStorage[storeName]) {
      for (const [key] of Object.entries(dataStorage)) {
        if (key === storeName) dataStorage[key] = hides;
      }
    } else {
      dataStorage[storeName] = hides;
    }
    ``;

    window.localStorage.setItem("visibleColumn", JSON.stringify(dataStorage));
  };

  // const handleColumnVisibility = colums => {
  //   let dataStorage = JSON.parse(window.localStorage.getItem('visibleColumn'))[storeName]
  //   try {
  //     colums.forEach(col => {
  //       if (dataStorage.includes(col.field)) col.hide = true
  //     })
  //     return colums
  //   } catch (error) {
  //     return colums
  //   }
  // }

  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
    if (clearResponse) dispatch(clearResponse());
  }, [message, error, dispatch, clearResponse]);

  useEffect(() => {
    dispatch(
      getData({
        page,
        page_size: pageSize,
        ...params,
      })
    );
  }, [page, pageSize, params, dispatch, getData]);

  return (
    <Grid container spacing={6} sx={{ color: "text.primary", fontSize: 11 }}>
      <Grid item xs={12}>
        <Breadcrumbs data={dataBreadcrumbs} />
      </Grid>
      <Grid item xs={12}>
        {filterData}
      </Grid>
      <Grid item xs={12}>
        <Card
          sx={{
            "& .hot": {
              backgroundColor: settings.mode === "dark" ? "#DF2E38" : "#FFE9EA",
              color: "#1a3e72",
            },
          }}
        >
          <TableHeader
            selectedRows={selectedRows}
            url={`${urlData}add`}
            name={nameLabel}
            actionExport={actionExport}
            actionRefresh={actionRefresh}
            dinamic={checkboxSelection}
            updateOnly={updateOnly}
            isImport={isImport}
            isExport={isExport}
            isCreate={isCreate}
            params={params}
            storeName={storeName}
            exportName={exportName}
            templateFile={templateFile}
            importFunction={importFunction}
          />

          <DataGrid
            // style={{ fontSize: 11 }}

            disableColumnFilter
            autoHeight
            pagination
            rows={datagrid}
            columns={columns}
            // checkboxSelection={checkboxSelection && updateOnly}
            loading={loading}
            disableSelectionOnClick
            // disableColumnFilter
            pageSize={pageSize}
            rowsPerPageOptions={[10, 20, 50, 100]}
            onSelectionModelChange={(rows) => setSelectedRows(rows)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            // getRowClassName={params => (!params.row.is_active ? 'hot' : '')}
            getRowClassName={(params) => {
              if ("is_active" in params.row && redNotActive) {
                return !params.row.is_active ? "hot" : "";
              }
              return "";
            }}
            onColumnVisibilityModelChange={handleVisibleGrid}
            components={{
              // Toolbar: TableHeader,
              LoadingOverlay: LinearProgress,
            }}
            componentsProps={{
              toolbar: {
                reloadCallback: () => {
                  dispatch(updateData(data));
                },
              },
            }}
            paginationMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            page={page}
            rowCount={total}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default ListData;
