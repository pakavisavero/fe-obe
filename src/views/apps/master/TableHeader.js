// ** Next Import
// ** MUI Imports
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "src/configs/AxiosSetting";
import { getCookie } from "cookies-next";
import ExportVariant from "mdi-material-ui/ExportVariant";
import Import from "mdi-material-ui/Import";
import Refresh from "mdi-material-ui/Refresh";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import ImportDialog from "../ImportDialog";
import { useRouter } from "next/router";

const TableHeader = (props) => {
  // ** Props
  const {
    url,
    name,
    actionRefresh,
    dinamic = false,
    updateOnly = false,
    isImport = false,
    isExport = false,
    checkboxMaster = false,
    params,
    storeName,
    templateFile,
    importFunction,
    exportName,
  } = props;

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const dispatch = useDispatch();

  const callbackImport = (dataFile) => {
    if (dataFile.length > 1) {
      console.log(dataFile);
      const dataRequest = { data: dataFile };
      dispatch(importFunction(dataRequest));
    } else {
      toast.error("File empty");
    }
  };

  const handleDownload = async () => {
    router.push(`http://127.0.0.1:8000/api/export/${exportName}`);
  };

  return (
    <>
      <ImportDialog
        callback={callbackImport}
        templateFile={templateFile}
        openDialog={open}
        handleClose={handleClose}
      />
      <Box
        sx={{
          p: 5,
          pb: 3,
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
          {dinamic && isExport && (
            <Button
              sx={{ mr: 4, fontSize: 12 }}
              color="secondary"
              variant="outlined"
              startIcon={<ExportVariant fontSize="small" />}
              onClick={handleDownload}
            >
              Export
            </Button>
          )}

          {dinamic && isImport && (
            <Button
              sx={{ mr: 4, fontSize: 12 }}
              color="secondary"
              variant="outlined"
              startIcon={<Import fontSize="small" />}
              onClick={handleOpen}
            >
              Import
            </Button>
          )}
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
          <Button
            sx={{ mr: 4, fontSize: 12 }}
            color="secondary"
            variant="outlined"
            startIcon={<Refresh fontSize="small" />}
            onClick={actionRefresh}
          >
            Refresh
          </Button>

          {dinamic && !updateOnly && (
            <Link href={url} passHref>
              <Button
                sx={{
                  fontSize: 12,
                  backgroundColor: "rgb(236,236,236)",
                  color: "black",
                  outlineColor: "black",
                }}
              >
                Create {name}
              </Button>
            </Link>
          )}

          {/* {checkboxMaster && (
            <>
              <Link href={url} passHref>
                <Button
                  sx={{
                    fontSize: 12,
                    backgroundColor: 'rgb(236,236,236)',
                    color: 'black',
                    outlineColor: 'black'
                  }}
                >
                  Create {name}
                </Button>
              </Link>
            </>
          )} */}
        </Box>
      </Box>
    </>
  );
};

export default TableHeader;
