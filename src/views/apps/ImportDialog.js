import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { read, utils } from "xlsx";
import FileUploaderSingleCustom from "src/views/apps/FileUploaderSingleCustom";

const ImportDialog = ({
  openDialog,
  handleClose,
  callback,
  templateFile,
  handleOpenDialog,
  handleCloseDialog,
}) => {
  const [file, setFile] = useState(null);

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  }, []);
  return (
    <>
      <Dialog
        open={openDialog}
        onClose={() => {
          setFile(null);
          handleClose();
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Import File</DialogTitle>
        <DialogContent>
          <FileUploaderSingleCustom
            file={file}
            accept={{
              "application/vnd.ms-excel": [".xls", ".xlsx", ".csv"],
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [".xlsx"],
            }}
            // accept='text/csv'
            onDrop={handleDropSingleFile}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setFile(null);
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              handleClose();
              handleOpenDialog();
              const f = await file.arrayBuffer();
              const wb = read(f); // parse the array buffer
              const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
              const data = utils.sheet_to_json(ws, {
                header: 1,
                rawNumbers: true,
                skipHidden: false,
              });
              callback(data);
              setFile(null);
              handleCloseDialog();
            }}
            autoFocus
            disabled={file ? false : true}
          >
            Import
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

ImportDialog.propTypes = {
  openDialog: PropTypes.bool,
  templateFile: PropTypes.string,
  callback: PropTypes.func,
  handleClose: PropTypes.func,
};

export default ImportDialog;
